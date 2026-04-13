import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  output,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, timer } from 'rxjs';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

const PALETTE_COLORS = [
  '#6e026f', // Deep Purple
  '#abdadc', // Soft Teal
  '#f1e6c9', // Warm Cream
  '#fa891a', // Vibrant Orange
];

const ANIMATION_DURATION = 10000; // 10 seconds
const PARTICLE_COUNT = 1500;

@Component({
  selector: 'app-salute-animation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <canvas #canvas class="pointer-events-none fixed inset-0 z-50" [style.will-change]="'transform'"></canvas>
  `,
})
export class SaluteAnimationComponent implements OnInit, OnDestroy {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly destroyRef = inject(DestroyRef);

  readonly animationComplete = output<void>();

  private particles: Particle[] = [];
  private animationFrameId: number | null = null;
  private readonly stop$ = new Subject<void>();

  ngOnInit(): void {
    this.initCanvas();
    this.startAnimation();

    timer(ANIMATION_DURATION)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.stopAnimation();
        this.animationComplete.emit();
      });
  }

  private initCanvas(): void {
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.createParticles();
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef().nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private createParticles(): void {
    const canvas = this.canvasRef().nativeElement;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    this.particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 8 + 2; // Random velocity 2-10
      const size = Math.random() * 4 + 2; // Random size 2-6

      this.particles.push({
        x: centerX + (Math.random() - 0.5) * 100, // Spread from center
        y: centerY + (Math.random() - 0.5) * 100,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 3, // Slight upward bias
        size,
        color: PALETTE_COLORS[Math.floor(Math.random() * PALETTE_COLORS.length)],
        life: 0,
        maxLife: 150 + Math.random() * 100,
      });
    }
  }

  private startAnimation(): void {
    const animate = () => {
      const canvas = this.canvasRef().nativeElement;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return;
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      this.updateParticles();
      this.drawParticles(ctx);

      // Respawn particles continuously for 10 seconds
      if (this.particles.length < PARTICLE_COUNT) {
        this.spawnParticles(5);
      }

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  private updateParticles(): void {
    const canvas = this.canvasRef().nativeElement;

    this.particles = this.particles.filter(p => {
      // Apply gravity
      p.vy += 0.15;

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Apply friction
      p.vx *= 0.99;
      p.vy *= 0.99;

      // Increment life
      p.life++;

      // Keep particles on screen for bounce effect
      if (p.y > canvas.height) {
        p.y = canvas.height;
        p.vy *= -0.5; // Bounce with damping
      }

      // Keep particles within horizontal bounds
      if (p.x < 0 || p.x > canvas.width) {
        p.vx *= -1;
      }

      return p.life < p.maxLife;
    });
  }

  private drawParticles(ctx: CanvasRenderingContext2D): void {
    for (const p of this.particles) {
      const opacity = 1 - p.life / p.maxLife;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = this.hexToRgba(p.color, opacity);
      ctx.fill();
    }
  }

  private spawnParticles(count: number): void {
    const canvas = this.canvasRef().nativeElement;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 8 + 2;
      const size = Math.random() * 4 + 2;

      this.particles.push({
        x: centerX + (Math.random() - 0.5) * 100,
        y: centerY + (Math.random() - 0.5) * 100,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 3,
        size,
        color: PALETTE_COLORS[Math.floor(Math.random() * PALETTE_COLORS.length)],
        life: 0,
        maxLife: 150 + Math.random() * 100,
      });
    }
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  private stopAnimation(): void {
    this.stop$.next();

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    // Clear canvas
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    this.particles = [];
  }

  ngOnDestroy(): void {
    this.stopAnimation();
  }
}
