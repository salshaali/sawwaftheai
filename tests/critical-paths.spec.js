import { test, expect } from '@playwright/test';

test.describe('Critical User Flows', () => {
  test('homepage loads and has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Sawwaf the AI/);
    await expect(page.locator('h1')).toContainText('Spreading Positivity');
  });

  test('navigation links scroll to sections', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Meet Sawwaf' }).click();
    await expect(page.locator('#about')).toBeInViewport();

    await page.getByRole('link', { name: 'How It Works' }).click();
    await expect(page.locator('#how-it-works')).toBeInViewport();

    await page.getByRole('link', { name: 'Socials' }).click();
    await expect(page.locator('#socials')).toBeInViewport();
  });

  test('contact form opens and has correct fields', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Collaborate with Sawwaf' }).first().click();
    
    await expect(page.getByLabel('Your Name')).toBeVisible();
    await expect(page.getByLabel('Business / Entity Name')).toBeVisible();
    await expect(page.getByLabel('Email Address')).toBeVisible();
    await expect(page.getByLabel('How can we collaborate?')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send Message' })).toBeVisible();
  });

  test('social media links have correct URLs', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', 'https://www.instagram.com/sawwaftheai');
    await expect(page.getByRole('link', { name: 'TikTok' })).toHaveAttribute('href', 'https://www.tiktok.com/@sawwaftheai');
    await expect(page.getByRole('link', { name: 'YouTube' })).toHaveAttribute('href', 'https://www.youtube.com/@SawwaftheAI');
    await expect(page.getByRole('link', { name: 'Threads' })).toHaveAttribute('href', 'https://www.threads.com/@sawwaftheai');
    await expect(page.getByRole('link', { name: 'X' })).toHaveAttribute('href', 'https://x.com/sawwaftheai');
  });
});
