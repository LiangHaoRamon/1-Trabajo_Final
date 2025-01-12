import requests
from bs4 import BeautifulSoup
import json

# Variable global para autoincrementar ID
CURRENT_ID = 1

def scrap_wiki_personaje(url):
    global CURRENT_ID

    response = requests.get(url)
    response.encoding = 'utf-8'
    soup = BeautifulSoup(response.text, 'html.parser')

    # Diccionario final con datos
    data = {}
    data["id"] = CURRENT_ID
    CURRENT_ID += 1

    # 1) Name: h1.page-header__title > span.mw-page-title-main
    nombre_span = soup.select_one("h1.page-header__title span.mw-page-title-main")
    data["name"] = nombre_span.get_text(strip=True) if nombre_span else None

    # 2) Planet (del infobox, data-source="mundo")
    mundo_div = soup.find("div", {"data-source": "mundo"})
    if mundo_div:
        valor_mundo = mundo_div.find("div", class_="pi-data-value pi-font")
        data["planet"] = valor_mundo.get_text(strip=True) if valor_mundo else None
    else:
        data["planet"] = None

    # 3) Description (en meta name="description")
    meta_desc = soup.find("meta", {"name": "description"})
    if meta_desc and meta_desc.has_attr("content"):
        data["description"] = meta_desc["content"]
    else:
        data["description"] = None

    # 4) Personality: bajo sección "Personalidad y apariencia"
    personalidad_text = ""
    personalidad_header = soup.find("span", id="Personalidad_y_apariencia")
    if personalidad_header:
        h2_seccion = personalidad_header.find_parent("h2")
        for sibling in h2_seccion.next_siblings:
            if sibling.name == "h2":
                break
            if sibling.name == "p":
                personalidad_text += sibling.get_text(strip=True) + "\n"
    data["personality"] = personalidad_text if personalidad_text else None

    # 5) Main ability (data-source="habilidades")
    habilidad_div = soup.find("div", {"data-source": "habilidades"})
    if habilidad_div:
        valor_hab = habilidad_div.find("div", class_="pi-data-value pi-font")
        data["main_ability"] = valor_hab.get_text(strip=True) if valor_hab else None
    else:
        data["main_ability"] = None

    # 6) Quote (div.quote)
    quote_div = soup.find("div", class_="quote")
    if quote_div:
        data["quote"] = quote_div.get_text(strip=True)
    else:
        data["quote"] = None

    return data


if __name__ == "__main__":
    # URLs de los personajes principales de Mistborn (en español)
    characters_urls = [
        "https://nacidos-de-la-bruma.fandom.com/es/wiki/Vin",
        "https://nacidos-de-la-bruma.fandom.com/es/wiki/Kelsier",
        "https://nacidos-de-la-bruma.fandom.com/es/wiki/Elend_Venture",
        "https://nacidos-de-la-bruma.fandom.com/es/wiki/Sazed",
        "https://nacidos-de-la-bruma.fandom.com/es/wiki/Fantasma",
        "https://nacidos-de-la-bruma.fandom.com/es/wiki/Waxillium_Ladrian",
        "https://nacidos-de-la-bruma.fandom.com/es/wiki/Wayne",
        "https://nacidos-de-la-bruma.fandom.com/es/wiki/Marasi_Colms",
    ]

    resultados = []
    for url in characters_urls:
        data_personaje = scrap_wiki_personaje(url)
        resultados.append(data_personaje)

    for r in resultados:
        print(r)
        print("--------------")

    # Guardar en JSON
    with open("personajes_mistborn.json", "w", encoding="utf-8") as f:
        json.dump(resultados, f, ensure_ascii=False, indent=4)

    print("\nDatos guardados en 'personajes_mistborn.json'")
