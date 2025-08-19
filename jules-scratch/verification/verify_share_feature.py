from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        page.goto("http://localhost:3000")

        # Click "Get Started"
        page.get_by_role("button", name="Get Started").click()

        # Fill out the form
        page.get_by_label("What's your name?").fill("Jules")
        page.get_by_role("img", name="Tisha").click()
        page.get_by_label("Current Age").fill("30")
        page.get_by_label("Annual Salary (USD)").fill("100000")
        page.get_by_label("Monthly Savings (USD)").fill("2000")
        page.get_by_label("Desired Retirement Age").fill("65")
        page.get_by_label("Desired Monthly Expense in Retirement (USD)").fill("3000")
        page.get_by_label("Life Expectancy").fill("90")

        # Click "Calculate"
        page.get_by_role("button", name="Calculate").click()

        # Wait for results to appear
        expect(page.get_by_text("Financial Independence Summary for Jules")).to_be_visible()

        # Take a screenshot of the results page
        page.screenshot(path="jules-scratch/verification/verification.png")

        # Click the menu button
        page.get_by_role("button").filter(has_not_text=True).nth(1).click()

        # Click the share button
        page.get_by_role("button", name="Share").click()

        # Wait for a moment to ensure the share logic is triggered
        page.wait_for_timeout(2000)

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
