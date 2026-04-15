"""
pull_all_posters.py
───────────────────
Fetches TMDB posters for ALL films/shows in the expanded Silver Nitrate
& Silicon canon, encodes them as base64 data URIs, and writes
all_posters_b64.json.

Usage:
    pip install requests
    python pull_all_posters.py
"""
import base64, json, sys, time
try:
    import requests
except ImportError:
    print("pip install requests"); sys.exit(1)

TOKEN = (
    "eyJhbGciOiJIUzI1NiJ9."
    "eyJhdWQiOiJlNGEyYmEwYmJlMTQ0YzhkODU0N2Q4NGRkYWQ4ZTI3ZCIsIm5iZiI6MTc1NjIzNzMxOS4xMjcsInN1YiI6IjY4YWUwZTA3ZTQ0YjdlOTZkYzNkODdkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ."
    "LjnVpGefm7GlyW5ddx7El42Z-JuDsUK6ZuMdUab0KTg"
)
H = {"Authorization": f"Bearer {TOKEN}", "accept": "application/json"}

# (exhibit_id, type, title, year)
ITEMS = [
    # Built for the Screen
    ("starWars",        "movie", "Star Wars",                            1977),
    ("odyssey",         "movie", "2001: A Space Odyssey",                1968),
    ("bladeRunner",     "movie", "Blade Runner",                         1982),
    ("tron",            "movie", "Tron",                                 1982),
    ("abyss",           "movie", "The Abyss",                            1989),
    ("terminator2",     "movie", "Terminator 2: Judgment Day",           1991),
    ("jurassic",        "movie", "Jurassic Park",                        1993),
    ("toyStory",        "movie", "Toy Story",                            1995),
    ("benjaminButton",  "movie", "The Curious Case of Benjamin Button",  2008),
    ("avatar",          "movie", "Avatar",                               2009),
    ("matrix",          "movie", "The Matrix",                           1999),
    ("gravity",         "movie", "Gravity",                              2013),
    ("mando",           "tv",    "The Mandalorian",                      2019),
    # Escapees — mostly no posters, handled as SVG. (Skip in fetch.)
    # Imagined Interfaces
    ("starTrek",        "tv",    "Star Trek",                            1966),
    ("minority",        "movie", "Minority Report",                      2002),
    ("her",             "movie", "Her",                                  2013),
    ("ironMan",         "movie", "Iron Man",                             2008),
    ("blackPanther",    "movie", "Black Panther",                        2018),
    # Tech Anxiety
    ("terminator",      "movie", "The Terminator",                       1984),
    ("warGames",        "movie", "WarGames",                             1983),
    ("matrixTa",        "movie", "The Matrix",                           1999),  # same film, shared
    ("blackMirror",     "tv",    "Black Mirror",                         2011),
    ("m3gan",           "movie", "M3GAN",                                2022),
    # AI Imagination
    ("exMachina",       "movie", "Ex Machina",                           2014),
    ("westworld",       "tv",    "Westworld",                            2016),
    ("afterYang",       "movie", "After Yang",                           2021),
    ("beRightBack",     "tv",    "Black Mirror",                         2011),  # episode; use show poster
    # Founder Mythology
    ("social",          "movie", "The Social Network",                   2010),
    ("sv",              "tv",    "Silicon Valley",                       2014),
    ("steveJobs",       "movie", "Steve Jobs",                           2015),
    ("dropout",         "tv",    "The Dropout",                          2022),
    ("weCrashed",       "tv",    "WeCrashed",                            2022),
    ("superPumped",     "tv",    "Super Pumped",                         2022),
    ("piratesSv",       "movie", "Pirates of Silicon Valley",            1999),
    ("air",             "movie", "Air",                                  2023),
    # Fiction Made Real
    ("bttf2",           "movie", "Back to the Future Part II",           1989),
    ("totalRecall",     "movie", "Total Recall",                         1990),
    ("missionImpossible","movie","Mission: Impossible",                  1996),
    # Hacker Archetypes
    ("hackers",         "movie", "Hackers",                              1995),
    ("sneakers",        "movie", "Sneakers",                             1992),
    ("theNet",          "movie", "The Net",                              1995),
    ("mrRobot",         "tv",    "Mr. Robot",                            2015),
]

SIZE = "w342"

def search(kind, title, year):
    url = f"https://api.themoviedb.org/3/search/{kind}"
    yparam = "year" if kind == "movie" else "first_air_date_year"
    r = requests.get(url, headers=H, params={"query": title, yparam: year}, timeout=20)
    r.raise_for_status()
    res = r.json().get("results", [])
    if not res:
        r = requests.get(url, headers=H, params={"query": title}, timeout=20)
        r.raise_for_status()
        res = r.json().get("results", [])
    return res[0] if res else None

def encode(path):
    url = f"https://image.tmdb.org/t/p/{SIZE}{path}"
    r = requests.get(url, timeout=30); r.raise_for_status()
    return "data:image/jpeg;base64," + base64.b64encode(r.content).decode()

def main():
    out = {}
    for eid, kind, title, year in ITEMS:
        print(f"→ {eid}: {title} ({year})... ", end="", flush=True)
        try:
            hit = search(kind, title, year)
        except Exception as e:
            print(f"search error: {e}"); continue
        if not hit or not hit.get("poster_path"):
            print("no poster"); continue
        try:
            out[eid] = encode(hit["poster_path"])
            print(f"{len(out[eid])//1024}KB ✓")
        except Exception as e:
            print(f"download error: {e}")
        time.sleep(0.15)
    with open("all_posters_b64.json", "w") as f:
        json.dump(out, f)
    total = sum(len(v) for v in out.values()) // 1024
    print(f"\n✓ all_posters_b64.json  ({len(out)} posters, {total}KB)")

if __name__ == "__main__":
    main()
