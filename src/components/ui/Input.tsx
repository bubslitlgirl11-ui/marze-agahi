import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || (label ? `input-${label.replace(/\s+/g, '-')}` : undefined)

    return (
      <div className="w-full space-y-1.5 text-right">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={twMerge(
            clsx(
              'w-full px-3.5 py-2.5 bg-surface border rounded-lg text-text-primary text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-text-secondary/50',
              error ? 'border-danger focus:ring-danger' : 'border-border',
              className
            )
          )}
          {...props}
        />
        {hint && !error && <p className="text-xs text-text-secondary">{hint}</p>}
        {error && <p className="text-xs text-danger font-medium">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? `textarea-${label.replace(/\s+/g, '-')}` : undefined)

    return (
      <div className="w-full space-y-1.5 text-right">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={twMerge(
            clsx(
              'w-full px-3.5 py-2.5 bg-surface border rounded-lg text-text-primary text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-text-secondary/50 leading-persian',
              error ? 'border-danger focus:ring-danger' : 'border-border',
              className
            )
          )}
          {...props}
        />
        {hint && !error && <p className="text-xs text-text-secondary">{hint}</p>}
        {error && <p className="text-xs text-danger font-medium">{error}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode
  error?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const checkId = id || `check-${Math.random().toString(36).slice(2, 8)}`

    return (
      <div className="space-y-1">
        <label htmlFor={checkId} className="flex items-start gap-3 cursor-pointer select-none text-right">
          <input
            id={checkId}
            ref={ref}
            type="checkbox"
            className={twMerge(
              clsx(
                'mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer',
                className
              )
            )}
            {...props}
          />
          <span className="text-sm text-text-primary leading-relaxed">{label}</span>
        </label>
        {error && <p className="text-xs text-danger font-medium mr-7">{error}</p>}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
