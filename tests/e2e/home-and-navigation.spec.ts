import { test, expect } from '@playwright/test'

test.describe('E2E: Home and Public Navigation', () => {
  test('renders homepage with Persian title, hero section, and navigation links', async ({ page }) => {
    await page.goto('/')

    // Check title
    await expect(page).toHaveTitle(/مرز آگاهی/)

    // Check RTL direction on HTML tag
    const htmlDir = await page.locator('html').getAttribute('dir')
    expect(htmlDir).toBe('rtl')

    // Check Hero header
    const heroHeader = page.locator('h1')
    await expect(heroHeader).toContainText('تجربه‌های مرزی آگاهی')

    // Check presence of action buttons
    const viewExpBtn = page.getByRole('link', { name: 'مشاهده تجربه‌ها' })
    await expect(viewExpBtn).toBeVisible()

    const submitBtn = page.getByRole('link', { name: 'ثبت تجربه من' }).first()
    await expect(submitBtn).toBeVisible()
  })

  test('navigates to experiences archive and displays filters', async ({ page }) => {
    await page.goto('/experiences')
    await expect(page.locator('h1')).toContainText('آرشیو مستندسازی تجربه‌ها')
    await expect(page.getByPlaceholder('جست‌وجو در عنوان، شرح یا محتوای روایت...')).toBeVisible()
  })

  test('navigates to patterns atlas', async ({ page }) => {
    await page.goto('/patterns')
    await expect(page.locator('h1')).toContainText('اطلس الگوهای مشترک آگاهی')
  })
})
