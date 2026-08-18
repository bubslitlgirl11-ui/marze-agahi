import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'muted' | 'bordered'
}

export const Card: React.FC<CardProps> = ({ className, variant = 'default', children, ...props }) => {
  const baseStyles = 'rounded-xl transition-all'

  const variants = {
    default: 'bg-surface border border-border/80 shadow-sm hover:border-primary/40',
    muted: 'bg-background/80 border border-border',
    bordered: 'bg-surface border-2 border-border',
  }

  return (
    <div className={twMerge(clsx(baseStyles, variants[variant], className))} {...props}>
      {children}
    </div>
  )
}
