import { describe, it, expect } from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'
import { Logo, LogoIcon } from '@/components/ui/Logo'

describe('Logo Component', () => {
  it('renders LogoIcon properly as an SVG', () => {
    const { container } = render(<LogoIcon size={48} />)
    const svg = container.querySelector('svg')
    expect(svg).not.toBeNull()
    expect(svg?.getAttribute('width')).toBe('48')
    expect(svg?.getAttribute('height')).toBe('48')
  })

  it('renders full brand text by default', () => {
    const { getByText } = render(<Logo />)
    expect(getByText('مرز آگاهی')).toBeDefined()
    expect(getByText(/آرشیو پژوهشی تجارب مرزی/)).toBeDefined()
  })

  it('renders compact variant without subtitle', () => {
    const { getByText, queryByText } = render(<Logo variant="compact" />)
    expect(getByText('مرز آگاهی')).toBeDefined()
    expect(queryByText(/آرشیو پژوهشی تجارب مرزی/)).toBeNull()
  })

  it('renders only icon when variant="icon"', () => {
    const { queryByText, container } = render(<Logo variant="icon" />)
    expect(queryByText('مرز آگاهی')).toBeNull()
    expect(container.querySelector('svg')).not.toBeNull()
  })
})
