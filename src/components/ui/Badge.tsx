import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'neutral'
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = 'neutral', children, ...props }) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'

  const variants = {
    primary: 'bg-primary-light text-primary border border-primary/20',
    secondary: 'bg-accent-light text-accent border border-accent/20',
    outline: 'border border-border text-text-secondary bg-surface',
    danger: 'bg-danger-light text-danger border border-danger/20',
    success: 'bg-success-light text-success border border-success/20',
    neutral: 'bg-background text-text-secondary border border-border',
  }

  return (
    <span className={twMerge(clsx(baseStyles, variants[variant], className))} {...props}>
      {children}
    </span>
  )
}
