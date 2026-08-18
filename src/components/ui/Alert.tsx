import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'warning' | 'error' | 'success'
  title?: string
}

export const Alert: React.FC<AlertProps> = ({ className, variant = 'info', title, children, ...props }) => {
  const icons = {
    info: <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="w-5 h-5 text-accent shrink-0 mt-0.5" />,
    error: <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />,
    success: <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />,
  }

  const styles = {
    info: 'bg-primary-light/50 border-primary/20 text-text-primary',
    warning: 'bg-accent-light/50 border-accent/20 text-text-primary',
    error: 'bg-danger-light/50 border-danger/20 text-text-primary',
    success: 'bg-success-light/50 border-success/20 text-text-primary',
  }

  return (
    <div
      role="alert"
      className={twMerge(clsx('flex items-start gap-3 p-4 rounded-xl border text-right', styles[variant], className))}
      {...props}
    >
      {icons[variant]}
      <div className="space-y-1 text-sm leading-relaxed w-full">
        {title && <h5 className="font-semibold text-text-primary">{title}</h5>}
        <div className="text-text-secondary">{children}</div>
      </div>
    </div>
  )
}

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={twMerge(clsx('animate-pulse bg-border/60 rounded-md', className))}
      {...props}
    />
  )
}

export interface EmptyStateProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-xl bg-surface border border-border/80 space-y-4 my-6">
      <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-text-secondary">
        <Info className="w-6 h-6" />
      </div>
      <div className="space-y-1.5 max-w-md">
        <h4 className="text-base font-semibold text-text-primary">{title}</h4>
        {description && <p className="text-sm text-text-secondary leading-relaxed">{description}</p>}
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  )
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export const Breadcrumb: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  return (
    <nav aria-label="مسیر راهنما" className="py-2.5 text-xs text-text-secondary">
      <ol className="flex items-center gap-2 flex-wrap">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <li key={idx} className="flex items-center gap-2">
              {idx > 0 && <span className="text-border">/</span>}
              {item.href && !isLast ? (
                <a href={item.href} className="hover:text-primary transition-colors">
                  {item.label}
                </a>
              ) : (
                <span className={clsx(isLast ? 'text-text-primary font-medium' : '')}>{item.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
