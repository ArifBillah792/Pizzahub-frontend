"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Flame } from "lucide-react";

const perks = ["Order in 3 taps", "Track every order", "Reviewed menus only"];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* soft red glow in the background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 size-[600px] rounded-full bg-primary/20 blur-[140px]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-24">
        {/* text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-4 py-1.5 text-xs font-semibold tracking-wider text-accent uppercase">
            <Flame className="size-4" /> Local pizzerias · Open late
          </span>
          <h1 className="text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl">
            Hot &amp; Fresh Pizza{" "}
            <span className="text-glow text-primary">Delivered</span> to Your
            Door
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Discover the best pizza shops near you, browse their menus, and
            order your favourite pie for any day you like.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/menu"
              className="glow-red inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition hover:bg-primary/85"
            >
              Explore Pizza Menu <ArrowRight className="size-5" />
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center rounded-full border border-border px-7 py-3.5 font-semibold transition hover:border-primary hover:text-primary"
            >
              Sell on PizzaHub
            </Link>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-green-400" /> {p}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* spinning pizza */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          <div className="absolute inset-8 rounded-full shadow-[0_0_140px_40px_rgba(230,57,70,0.35)]" />
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            viewBox="0 0 200 200"
            className="relative size-full"
            role="img"
            aria-label="Pepperoni pizza"
          >
            <circle cx="100" cy="100" r="96" fill="#d98e3f" />
            <circle cx="100" cy="100" r="84" fill="#c1272d" />
            <circle cx="100" cy="100" r="80" fill="#f7cf6b" />
            {[
              [70, 66],
              [128, 60],
              [142, 112],
              [96, 104],
              [60, 124],
              [108, 148],
            ].map(([cx, cy]) => (
              <circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r="12.5"
                fill="#9e1b22"
              />
            ))}
            <ellipse
              cx="100"
              cy="74"
              rx="9"
              ry="5"
              fill="#2f8f46"
              transform="rotate(-30 100 74)"
            />
            <ellipse
              cx="74"
              cy="98"
              rx="9"
              ry="5"
              fill="#2f8f46"
              transform="rotate(40 74 98)"
            />
            <ellipse
              cx="128"
              cy="134"
              rx="9"
              ry="5"
              fill="#2f8f46"
              transform="rotate(-20 128 134)"
            />
            <g stroke="#d98e3f" strokeWidth="2.5">
              <line x1="100" y1="4" x2="100" y2="196" />
              <line x1="4" y1="100" x2="196" y2="100" />
              <line x1="32" y1="32" x2="168" y2="168" />
              <line x1="168" y1="32" x2="32" y2="168" />
            </g>
          </motion.svg>

          {/* floating tags */}
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-8 -left-2 flex items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-2 text-sm font-semibold backdrop-blur"
          >
            <span className="size-2.5 rounded-full bg-primary" /> Fresh tomato
          </motion.span>
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute top-1/2 -right-4 flex items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-2 text-sm font-semibold backdrop-blur"
          >
            <span className="size-2.5 rounded-full bg-accent" /> Extra
            mozzarella
          </motion.span>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-6 left-4 flex items-center gap-3 rounded-2xl border border-border bg-card/90 p-3 backdrop-blur"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-green-600">
              <CheckCircle2 className="size-5 text-white" />
            </span>
            <div>
              <p className="text-sm font-bold">Order accepted</p>
              <p className="text-xs text-muted-foreground">
                Your pizza is in the oven
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
