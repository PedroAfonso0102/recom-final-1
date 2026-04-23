from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    page.goto("http://localhost:5173/recom-final-1/")
    page.wait_for_timeout(3000)

    # Screenshot da Home
    page.screenshot(path="/home/jules/verification/screenshots/home.png")

    # Debug: imprimir todos os links visíveis
    links = page.query_selector_all("a")
    for link in links:
        print(f"Link: {link.inner_text()} -> {link.get_attribute('href')}")

    # Tentar clicar pelo texto exato ou seletor CSS se falhar
    try:
        page.click("nav >> text=A RECOM")
        page.wait_for_timeout(1000)
        page.screenshot(path="/home/jules/verification/screenshots/a-recom.png")
    except Exception as e:
        print(f"Erro ao clicar em A RECOM: {e}")

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
