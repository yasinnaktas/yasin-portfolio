#!/usr/bin/env python3
"""
Yasin Films Video Scraper
-------------------------
yasinfilms.com.tr/work sayfasından video içeriklerini çeker
ve projects.json dosyasına yapılandırılmış şekilde kaydeder.

Kullanım:
    python video_scraper.py

Çıktı:
    ../data/projects.json
"""

import requests
from bs4 import BeautifulSoup
import json
import re
import os
from urllib.parse import urljoin
from datetime import datetime

# Konfigürasyon
BASE_URL = "https://yasinfilms.com.tr"
WORK_URL = f"{BASE_URL}/work"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "data")
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "projects.json")

# HTTP Headers
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
}


def fetch_page(url: str) -> str:
    """Sayfa HTML içeriğini çeker."""
    try:
        response = requests.get(url, headers=HEADERS, timeout=30)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        print(f"[HATA] Sayfa çekilemedi: {url}")
        print(f"       Detay: {e}")
        return ""


def extract_video_sources(html: str) -> list[dict]:
    """
    HTML içinden video kaynaklarını çıkarır.
    
    Desteklenen formatlar:
    - <video> elementleri
    - Vimeo embed'leri
    - YouTube embed'leri
    - Doğrudan .mp4 linkleri
    """
    soup = BeautifulSoup(html, "html.parser")
    projects = []
    
    # 1. <video> elementlerini tara
    for idx, video in enumerate(soup.find_all("video"), 1):
        project = {
            "id": f"project-{idx}",
            "title": "",
            "videoUrl": "",
            "thumbnail": "",
            "category": "Reklam Filmi",
            "year": str(datetime.now().year),
            "client": "",
        }
        
        # Video kaynağı
        source = video.find("source")
        if source and source.get("src"):
            project["videoUrl"] = urljoin(BASE_URL, source["src"])
        elif video.get("src"):
            project["videoUrl"] = urljoin(BASE_URL, video["src"])
        
        # Poster/thumbnail
        if video.get("poster"):
            project["thumbnail"] = urljoin(BASE_URL, video["poster"])
        
        # Başlık - parent container'dan al
        parent = video.find_parent(["div", "article", "section"])
        if parent:
            # Başlık elementlerini ara
            title_elem = parent.find(["h1", "h2", "h3", "h4", "h5", "p", "span"], 
                                      class_=re.compile(r"title|name|heading", re.I))
            if title_elem:
                project["title"] = title_elem.get_text(strip=True)
            
            # Kategori
            cat_elem = parent.find(class_=re.compile(r"category|tag|type", re.I))
            if cat_elem:
                project["category"] = cat_elem.get_text(strip=True)
        
        # Başlık yoksa dosya adından türet
        if not project["title"] and project["videoUrl"]:
            filename = project["videoUrl"].split("/")[-1]
            project["title"] = filename.replace(".mp4", "").replace("-", " ").replace("_", " ").title()
        
        if project["videoUrl"]:
            projects.append(project)
    
    # 2. iframe embed'leri (Vimeo, YouTube)
    for idx, iframe in enumerate(soup.find_all("iframe"), len(projects) + 1):
        src = iframe.get("src", "")
        
        if "vimeo.com" in src or "youtube.com" in src or "youtu.be" in src:
            project = {
                "id": f"project-{idx}",
                "title": f"Video Project {idx}",
                "videoUrl": src,
                "thumbnail": "",
                "category": "Video Prodüksiyon",
                "year": str(datetime.now().year),
                "client": "",
                "isEmbed": True,
            }
            
            # Vimeo thumbnail
            if "vimeo.com" in src:
                vimeo_id = re.search(r"vimeo\.com/(?:video/)?(\d+)", src)
                if vimeo_id:
                    project["vimeoId"] = vimeo_id.group(1)
            
            # YouTube thumbnail
            if "youtube.com" in src or "youtu.be" in src:
                yt_id = re.search(r"(?:youtube\.com/embed/|youtu\.be/)([a-zA-Z0-9_-]+)", src)
                if yt_id:
                    project["youtubeId"] = yt_id.group(1)
                    project["thumbnail"] = f"https://img.youtube.com/vi/{yt_id.group(1)}/maxresdefault.jpg"
            
            projects.append(project)
    
    # 3. Doğrudan .mp4 linklerini tara
    for link in soup.find_all("a", href=re.compile(r"\.mp4$", re.I)):
        href = link.get("href", "")
        if href and not any(p["videoUrl"] == urljoin(BASE_URL, href) for p in projects):
            project = {
                "id": f"project-{len(projects) + 1}",
                "title": link.get_text(strip=True) or href.split("/")[-1].replace(".mp4", "").title(),
                "videoUrl": urljoin(BASE_URL, href),
                "thumbnail": "",
                "category": "Video",
                "year": str(datetime.now().year),
                "client": "",
            }
            projects.append(project)
    
    return projects


def generate_placeholder_data() -> list[dict]:
    """
    Scraping başarısız olursa placeholder veri üretir.
    Bu veriler daha sonra manuel olarak güncellenebilir.
    """
    categories = [
        "Marka Kampanyası",
        "Reklam Filmi", 
        "Sosyal Medya",
        "Kurumsal Video",
        "Ürün Tanıtımı",
        "AI Video",
    ]
    
    placeholder_projects = [
        {
            "id": "project-1",
            "title": "Brand Campaign 2024",
            "videoUrl": "/videos/brand-campaign.mp4",
            "thumbnail": "/thumbnails/brand-campaign.jpg",
            "category": "Marka Kampanyası",
            "year": "2024",
            "client": "Kurumsal Marka",
        },
        {
            "id": "project-2",
            "title": "AI-Powered Commercial",
            "videoUrl": "/videos/ai-commercial.mp4",
            "thumbnail": "/thumbnails/ai-commercial.jpg",
            "category": "AI Video",
            "year": "2024",
            "client": "Tech Startup",
        },
        {
            "id": "project-3",
            "title": "Product Launch Film",
            "videoUrl": "/videos/product-launch.mp4",
            "thumbnail": "/thumbnails/product-launch.jpg",
            "category": "Ürün Tanıtımı",
            "year": "2024",
            "client": "E-Commerce Brand",
        },
        {
            "id": "project-4",
            "title": "Social Media Series",
            "videoUrl": "/videos/social-series.mp4",
            "thumbnail": "/thumbnails/social-series.jpg",
            "category": "Sosyal Medya",
            "year": "2024",
            "client": "Lifestyle Brand",
        },
        {
            "id": "project-5",
            "title": "Corporate Documentary",
            "videoUrl": "/videos/corporate-doc.mp4",
            "thumbnail": "/thumbnails/corporate-doc.jpg",
            "category": "Kurumsal Video",
            "year": "2023",
            "client": "Enterprise Company",
        },
        {
            "id": "project-6",
            "title": "Motion Graphics Reel",
            "videoUrl": "/videos/motion-reel.mp4",
            "thumbnail": "/thumbnails/motion-reel.jpg",
            "category": "Reklam Filmi",
            "year": "2023",
            "client": "Creative Agency",
        },
    ]
    
    return placeholder_projects


def save_projects(projects: list[dict], filepath: str) -> None:
    """Projeleri JSON dosyasına kaydeder."""
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    
    output = {
        "lastUpdated": datetime.now().isoformat(),
        "source": WORK_URL,
        "totalProjects": len(projects),
        "projects": projects,
    }
    
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    print(f"[OK] {len(projects)} proje kaydedildi: {filepath}")


def main():
    """Ana scraping işlemi."""
    print("=" * 50)
    print("Yasin Films Video Scraper")
    print("=" * 50)
    print(f"\nHedef URL: {WORK_URL}")
    print("Sayfa çekiliyor...\n")
    
    html = fetch_page(WORK_URL)
    
    if html:
        projects = extract_video_sources(html)
        
        if projects:
            print(f"[OK] {len(projects)} video bulundu!\n")
            for p in projects:
                print(f"  - {p['title']} ({p['category']})")
        else:
            print("[UYARI] Video bulunamadı, placeholder veri kullanılıyor...")
            projects = generate_placeholder_data()
    else:
        print("[UYARI] Sayfa çekilemedi, placeholder veri kullanılıyor...")
        projects = generate_placeholder_data()
    
    print()
    save_projects(projects, OUTPUT_FILE)
    
    print("\n" + "=" * 50)
    print("Tamamlandı!")
    print("=" * 50)


if __name__ == "__main__":
    main()
