"""
Assembles the expanded Silver Nitrate & Silicon museum artifact.
Reads current posters from /mnt/uploads/posters_b64.json (9 items)
and writes the full jsx to /mnt/outputs/silver-nitrate-and-silicon.jsx
"""
import json, pathlib, sys

# ─── POSTERS (existing 9, embedded; others fall back to SVG until fetched) ──
POSTERS_PATH = "/sessions/happy-focused-maxwell/mnt/uploads/all_posters_b64.json"
try:
    POSTERS = json.load(open(POSTERS_PATH))
except FileNotFoundError:
    POSTERS = {}
print(f"Loaded {len(POSTERS)} posters from {POSTERS_PATH}")

# ─── SUBWINGS (four, arranged in quadrants on the hall canvas) ─────────────
SUBWINGS = [
    {  # top-left  — engineering origin story
        "id": "builtForScreen", "numeral": "I",
        "title": "Built for the Screen",
        "subtitle": "Technology demanded into being by the camera",
        "pos": {"left": "24%", "top": "32%"}, "rotate": -1.8,
        "palette": {"bg": "#eef1f2", "ink": "#1a2128", "dim": "#7d8891",
                    "faint": "#c8d0d5", "accent": "#4a7f9e", "tone": "#e3e8eb"},
        "hero_art": "jurassic",
    },
    {  # top-right — optimistic cultural
        "id": "imaginedFutures", "numeral": "II",
        "title": "Imagined Futures",
        "subtitle": "The futures cinema pictured — that then arrived",
        "pos": {"left": "74%", "top": "30%"}, "rotate": 1.4,
        "palette": {"bg": "#f3eed8", "ink": "#2a2414", "dim": "#8c8364",
                    "faint": "#ddd2a8", "accent": "#a67a2e", "tone": "#e9e0c0"},
        "hero_art": "starTrek",
    },
    {  # bottom-left — fear cultural
        "id": "cautionaryTales", "numeral": "III",
        "title": "Cautionary Tales",
        "subtitle": "The fears cinema planted, then we grew",
        "pos": {"left": "26%", "top": "70%"}, "rotate": 1.2,
        "palette": {"bg": "#e6e4df", "ink": "#1f2024", "dim": "#7a7c80",
                    "faint": "#bec0c3", "accent": "#9a4a2c", "tone": "#d5d3cf"},
        "hero_art": "terminator",
    },
    {  # bottom-right — mythology cultural
        "id": "founderMythology", "numeral": "IV",
        "title": "Founder Mythology",
        "subtitle": "The stories we told ourselves about tech power",
        "pos": {"left": "72%", "top": "70%"}, "rotate": -1.5,
        "palette": {"bg": "#efeae2", "ink": "#231e1a", "dim": "#887a6e",
                    "faint": "#ccc0b3", "accent": "#7a4a3f", "tone": "#e0d7c8"},
        "hero_art": "social",
    },
]

# ─── ROOMS ──────────────────────────────────────────────────────────────────
# Positions are absolute on the canvas (not relative) for simplicity.
# Rooms appear when their subwing is open; collapse when closed.
ROOMS = [
    # Wing I: Built for the Screen (4 rooms scattered on its own page)
    {"id": "motionControl", "subwing": "builtForScreen",
     "title": "Motion Control & Miniatures",
     "blurb": "The pre-digital craft — cameras and models doing the work.",
     "pos": {"left": "22%", "top": "42%"}, "rotate": -1.5, "hero_art": "starWars"},
    {"id": "renderFarm", "subwing": "builtForScreen",
     "title": "The Render Farm",
     "blurb": "Computation becomes an artistic medium.",
     "pos": {"left": "48%", "top": "56%"}, "rotate": 0.8, "hero_art": "toyStory"},
    {"id": "virtualSet", "subwing": "builtForScreen",
     "title": "The Virtual Set",
     "blurb": "Impossible spaces, made real on stage.",
     "pos": {"left": "74%", "top": "42%"}, "rotate": -0.8, "hero_art": "mando"},
    {"id": "escapees", "subwing": "builtForScreen",
     "title": "The Escapees",
     "blurb": "Tools that left cinema to remake the world.",
     "pos": {"left": "50%", "top": "78%"}, "rotate": 1.0, "hero_art": None},

    # Wing II: Imagined Futures (2 rooms)
    {"id": "imaginedInterfaces", "subwing": "imaginedFutures",
     "title": "Imagined Interfaces",
     "blurb": "Screens that taught the real world how to look.",
     "pos": {"left": "34%", "top": "48%"}, "rotate": -1.2, "hero_art": "odyssey"},
    {"id": "fictionMadeReal", "subwing": "imaginedFutures",
     "title": "Fiction Made Real",
     "blurb": "Screen tech that manufacturers later actually built.",
     "pos": {"left": "64%", "top": "54%"}, "rotate": 1.0, "hero_art": "bttf2"},

    # Wing III: Cautionary Tales (3 rooms)
    {"id": "techAnxiety", "subwing": "cautionaryTales",
     "title": "Tech Anxiety",
     "blurb": "The fears fiction planted, then we grew.",
     "pos": {"left": "22%", "top": "48%"}, "rotate": -1.3, "hero_art": "terminator"},
    {"id": "aiImagination", "subwing": "cautionaryTales",
     "title": "AI Imagination",
     "blurb": "How we picture artificial minds.",
     "pos": {"left": "50%", "top": "58%"}, "rotate": 0.9, "hero_art": "her"},
    {"id": "hackerArchetypes", "subwing": "cautionaryTales",
     "title": "Hacker Archetypes",
     "blurb": "Who we think techies are, and why.",
     "pos": {"left": "76%", "top": "46%"}, "rotate": -0.8, "hero_art": "hackers"},

    # Wing IV: Founder Mythology (2 rooms — split by angle)
    {"id": "mythMakers", "subwing": "founderMythology",
     "title": "The Myth-Makers",
     "blurb": "Origin stories. The founder as hero, genius, visionary.",
     "pos": {"left": "32%", "top": "48%"}, "rotate": -1.2, "hero_art": "social"},
    {"id": "theFall", "subwing": "founderMythology",
     "title": "The Fall",
     "blurb": "When the mythology breaks — disgrace, indictment, collapse.",
     "pos": {"left": "66%", "top": "54%"}, "rotate": 1.2, "hero_art": "dropout"},
]

# ─── EXHIBITS ───────────────────────────────────────────────────────────────
# Each exhibit: id, room, title, year, medium, demand, legacy, art (poster key),
# descendants[{kind, name, desc}]
# Kinds: person, company, product, software, concept, meme, device
E = {}

def e(id_, room, title, year, medium, demand, legacy, art, descendants):
    E[id_] = {"room": room, "title": title, "year": year, "medium": medium,
              "demand": demand, "legacy": legacy, "art": art,
              "descendants": descendants}

# Motion Control & Miniatures
e("starWars", "motionControl", "Star Wars", "1977", "Film · Lucasfilm",
  "George Lucas wanted starship dogfights that felt like WWII air combat — fast, weighty, in-camera. Nothing on earth could film that yet.",
  "John Dykstra's team built the Dykstraflex, a computer-controlled motion camera that could repeat identical passes. Industrial Light & Magic was founded to make the film and never stopped.",
  "starWars",
  [
      {"kind": "company", "name": "ILM (Industrial Light & Magic)", "desc": "Founded 1975 to make this film. Still the world's foremost VFX house."},
      {"kind": "device",  "name": "Dykstraflex", "desc": "The first motion-control camera rig. Every VFX camera move descends from it."},
      {"kind": "concept", "name": "The VFX studio", "desc": "The very idea of a permanent visual-effects company."},
  ])
e("odyssey", "motionControl", "2001: A Space Odyssey", "1968", "Film · Kubrick",
  "Kubrick convened industrial designers, NASA engineers, and futurists to imagine 2001 with rigorous plausibility — flat panels, talking computers, weightless toilets.",
  "HAL 9000 set the template for AI voices. The flat panels anticipated tablet computing by four decades. Practical effects for the spacecraft set the high bar for decades.",
  "odyssey",
  [
      {"kind": "product", "name": "Apple iPad (2010)", "desc": "The flat-panel PADDs on Discovery One anticipated tablets by 40 years."},
      {"kind": "concept", "name": "The AI voice", "desc": "HAL's measured tone became the dominant aesthetic of AI speech."},
      {"kind": "concept", "name": "Orbital wheel / centrifuge", "desc": "Shot in-camera via a rotating set. Still the gold standard."},
  ])
e("bladeRunner", "motionControl", "Blade Runner", "1982", "Film · Ridley Scott",
  "A lived-in future — rain and neon, Japanese billboards, replicants indistinguishable from humans. Achieved with meticulous miniatures and atmospheric photography.",
  "The Voight-Kampff test popularized a consumer vocabulary for distinguishing human from machine. The Esper 'enhance' spawned decades of televisual myth-making.",
  "bladeRunner",
  [
      {"kind": "concept", "name": "Cyberpunk aesthetic", "desc": "Rain, neon, corporate towers — still sold in ads today."},
      {"kind": "meme", "name": "'Enhance, enhance'", "desc": "Television's favourite way to recover impossible detail."},
      {"kind": "concept", "name": "Voight-Kampff in pop", "desc": "The Turing test framed as mainstream consumer concern."},
  ])

# Render Farm
e("tron", "renderFarm", "Tron", "1982", "Film · Disney",
  "To take the audience inside a computer — a world of light cycles, programs, and glowing grids.",
  "Tron's 15 minutes of pure CG legitimized the computer as a place movies could go. It would be 12 years before Toy Story proved it could carry a whole film.",
  "tron",
  [
      {"kind": "concept", "name": "The cyber-grid aesthetic", "desc": "Wireframe, light cycles, neon geometry — the visual shorthand for 'inside a computer.'"},
      {"kind": "concept", "name": "Cinematic CG", "desc": "Proof that digital imagery could survive on the big screen."},
  ])
e("abyss", "renderFarm", "The Abyss", "1989", "Film · Cameron",
  "A sentient underwater creature made of water — a CG shot that had to look wet, translucent, and alive.",
  "The water tentacle was the first fully photorealistic CG character. ILM wrote new software. The Oscar for visual effects followed.",
  "abyss",
  [
      {"kind": "software", "name": "Morphing tools at ILM", "desc": "Directly enabled Terminator 2's T-1000 two years later."},
      {"kind": "concept", "name": "Photoreal CG creatures", "desc": "The point where audiences accepted 'digital' as 'real.'"},
  ])
e("terminator2", "renderFarm", "Terminator 2: Judgment Day", "1991", "Film · Cameron",
  "The T-1000 — a liquid-metal shape-shifting assassin. Digital character acting, sustained, not a glimpse.",
  "The T-1000's morph unlocked CG as a vehicle for performance. 'Digital character' stopped being a gimmick and became a craft.",
  "terminator2",
  [
      {"kind": "concept", "name": "Digital acting", "desc": "Gollum, Caesar, Thanos — all descend from here."},
      {"kind": "software", "name": "Commercial morphing", "desc": "Generalized into software for music videos, ads, and eventually memes."},
      {"kind": "meme", "name": "'Morphing' as verb", "desc": "Entered the popular vocabulary of transformation."},
  ])
e("jurassic", "renderFarm", "Jurassic Park", "1993", "Film · ILM / Spielberg",
  "Dinosaurs indistinguishable from life — walking through a scene, in daylight, for minutes at a time.",
  "The moment CG crossed the threshold of acceptance. Every VFX studio built after 1993 is downstream of this film.",
  "jurassic",
  [
      {"kind": "software", "name": "Autodesk Maya", "desc": "The 3D software born partly from these pipelines. Now the industry standard."},
      {"kind": "company", "name": "Modern VFX industry", "desc": "DNEG, MPC, Framestore, Weta — the post-Jurassic ecosystem."},
      {"kind": "concept", "name": "Suspension of digital disbelief", "desc": "After 1993, audiences stopped asking 'is it real?'"},
  ])
e("toyStory", "renderFarm", "Toy Story", "1995", "Film · Pixar",
  "The first fully computer-animated feature. 800,000 machine-hours on a custom render farm of Sun workstations.",
  "Pixar's RenderMan and its farm architecture prefigured industrial cloud compute. Many machines converging on one frame is now how almost everything works.",
  "toyStory",
  [
      {"kind": "software", "name": "Pixar RenderMan", "desc": "The rendering language that underpins nearly all photoreal rendering."},
      {"kind": "concept", "name": "Industrial render farms", "desc": "Same architecture as modern AI training clusters."},
      {"kind": "concept", "name": "CG animated features", "desc": "DreamWorks, Illumination, Blue Sky — all downstream."},
  ])
e("benjaminButton", "renderFarm", "The Curious Case of Benjamin Button", "2008", "Film · Fincher",
  "Brad Pitt de-aged to an elderly infant and re-aged across decades — seamlessly, on his own face.",
  "The VFX aging pipeline built for this film is the direct ancestor of modern deepfake technology and every on-face consumer filter.",
  "benjaminButton",
  [
      {"kind": "concept", "name": "Deepfake technology", "desc": "The same face-mapping + generation pipeline, now at consumer scale."},
      {"kind": "product", "name": "FaceApp / Snapchat filters", "desc": "Age and gender transformations, direct descendants."},
      {"kind": "concept", "name": "De-aging in film", "desc": "Now standard practice from The Irishman to Indiana Jones."},
  ])
e("avatar", "renderFarm", "Avatar", "2009", "Film · Cameron",
  "A fully imagined alien world, captured with actors whose performances drove CG characters in real time, shown in stereoscopic 3D.",
  "Performance capture on the volume; the virtual camera; stereo 3D as a commercial format. Virtual production begins here.",
  "avatar",
  [
      {"kind": "concept", "name": "Virtual production", "desc": "The LED-wall stages of The Mandalorian descend from Avatar's capture volume."},
      {"kind": "product", "name": "Consumer motion capture", "desc": "Xsens, Rokoko — suits now used in games, sports, and indie film."},
      {"kind": "concept", "name": "Stereoscopic 3D's second era", "desc": "Made 3D briefly unavoidable. IMAX still honors it."},
  ])

# Virtual Set
e("matrix", "virtualSet", "The Matrix", "1999", "Film · Wachowskis",
  "Bullet time — a camera that moves around a frozen moment faster than any real camera could.",
  "A rig of over a hundred still cameras fired in sequence, computationally interpolated into motion.",
  "matrix",
  [
      {"kind": "product", "name": "Apple spatial video", "desc": "Multi-camera capture for Vision Pro descends from bullet-time arrays."},
      {"kind": "concept", "name": "Sports replay tech", "desc": "SkyCam, EyeVision, frozen-moment sports replays."},
      {"kind": "concept", "name": "360° / VR capture", "desc": "Volumetric video begins with the photographic array."},
  ])
e("gravity", "virtualSet", "Gravity", "2013", "Film · Cuarón",
  "Long unbroken takes of astronauts tumbling through zero-G with lighting that felt physically real.",
  "Cuarón's team built an LED light box — actors inside, panels outside projecting the scene. The direct ancestor of the LED wall.",
  "gravity",
  [
      {"kind": "concept", "name": "LED light stages", "desc": "Light boxes gave way to full LED walls — Mandalorian, Westworld late seasons."},
      {"kind": "concept", "name": "In-camera lighting from screens", "desc": "Now standard in car commercials and product photography."},
  ])
e("mando", "virtualSet", "The Mandalorian", "2019", "TV · ILM / Lucasfilm",
  "Photoreal environments that respond to camera movement — in-camera, at twenty-four frames per second, without post.",
  "StageCraft LED walls, powered by Unreal Engine, became the dominant infrastructure of prestige TV and high-end film.",
  "mando",
  [
      {"kind": "software", "name": "Unreal Engine (Epic Games)", "desc": "The game engine is now how movies are shot. Same tech runs NFL broadcasts."},
      {"kind": "concept", "name": "Virtual production industry", "desc": "LED volumes now operate in London, Mumbai, Atlanta, Seoul."},
      {"kind": "product", "name": "LED walls as advertising", "desc": "Every tentpole commercial was shot this way by 2023."},
  ])

# Escapees
e("photoshop", "escapees", "Photoshop", "1988", "Software · Thomas & John Knoll",
  "John Knoll worked at ILM. His brother Thomas built image software on a Mac Plus to solve compositing tasks.",
  "It escaped cinema entirely. Photoshop became the grammar of digital imagery — magazine covers, memes, every product photograph online.",
  "photoshop",
  [
      {"kind": "product", "name": "Instagram filters", "desc": "Levels, curves, saturation — presented to consumers as taps."},
      {"kind": "concept", "name": "Image editing at scale", "desc": "Affinity Photo, Figma, Canva — all descend from Photoshop's model."},
      {"kind": "meme", "name": "'Photoshopped'", "desc": "A verb. A noun. A skepticism about every image we see."},
  ])
e("renderman", "escapees", "RenderMan", "1988", "Software · Pixar",
  "A rendering specification stable enough to describe any scene, any surface, any lighting — for decades.",
  "Influenced every modern renderer. Its descendants light architectural viz, product launches, and generative-AI image pipelines.",
  "renderman",
  [
      {"kind": "software", "name": "Arnold / V-Ray / Redshift", "desc": "Every major production renderer is downstream of RenderMan's ideas."},
      {"kind": "concept", "name": "Physically based rendering", "desc": "The math of light and materials, now in every game engine."},
  ])
e("avid", "escapees", "Avid Media Composer", "1989", "Software · Avid Technology",
  "Film editors needed to escape the tyranny of linear tape. Non-linear editing required storage, codecs, and interfaces that did not exist.",
  "Every cut you have seen on YouTube, TikTok, or Instagram Reels descends from Avid's grammar — the timeline, the bin, the trim.",
  "avid",
  [
      {"kind": "product", "name": "Final Cut Pro / Premiere", "desc": "Professional NLE descendants."},
      {"kind": "product", "name": "TikTok / CapCut", "desc": "Avid's grammar, stripped to essentials, in a billion pockets."},
      {"kind": "concept", "name": "The timeline as interface", "desc": "Podcasting, streaming editing — timelines everywhere now."},
  ])
e("nuke", "escapees", "Nuke", "1993", "Software · Foundry",
  "A node-based compositor that could handle VFX-industry image volumes without falling over.",
  "Nuke became the industry standard for VFX compositing. Its node-based paradigm migrated into generative-AI tooling.",
  "nuke",
  [
      {"kind": "software", "name": "ComfyUI", "desc": "Node-based generative AI workflow — same mental model."},
      {"kind": "concept", "name": "Node-based software", "desc": "Blender, Houdini, Unreal Blueprints share the lineage."},
  ])

# Imagined Interfaces
e("starTrek", "imaginedInterfaces", "Star Trek: The Original Series", "1966", "TV · Gene Roddenberry",
  "A future where computers answered aloud, communicators flipped open, and doctors scanned patients with a handheld device.",
  "The most influential piece of screen media on real product design. Flip phones, tablets, voice computing — cited directly by the engineers who built them.",
  "starTrek",
  [
      {"kind": "product", "name": "Motorola StarTAC (1996)", "desc": "Martin Cooper cited the Trek communicator as his inspiration for the first flip phone."},
      {"kind": "product", "name": "Apple iPad (2010)", "desc": "Trek's PADDs — Personal Access Display Devices — are the direct ancestor."},
      {"kind": "product", "name": "Bluetooth earpieces", "desc": "Uhura's earpiece lived 40 years before AirPods."},
      {"kind": "concept", "name": "Voice computing", "desc": "'Computer, …' — Siri, Alexa, Google all cast in the Enterprise's voice."},
      {"kind": "product", "name": "Medical tricorders", "desc": "Qualcomm XPRIZE was named for it. Prototypes now in medical trials."},
  ])
e("minority", "imaginedInterfaces", "Minority Report", "2002", "Film · Spielberg",
  "Spielberg convened a futurists' summit to design 2054. They handed him working concepts, many of which their authors kept building afterward.",
  "John Underkoffler's gestural interface became Oblong Industries' g-speak. The film's advertising-follows-you dystopia arrived on schedule.",
  "minority",
  [
      {"kind": "company", "name": "Oblong g-speak", "desc": "Underkoffler's real gestural system, sold to enterprise clients for 15 years."},
      {"kind": "concept", "name": "Targeted advertising", "desc": "Personalized ads that follow you — Facebook Pixel, every retargeting network."},
      {"kind": "software", "name": "Predictive policing", "desc": "PredPol deployed in US cities. Critics use 'pre-crime' verbatim."},
      {"kind": "product", "name": "Leap Motion / Kinect", "desc": "Gestural input in consumer electronics."},
  ])
e("her", "imaginedInterfaces", "Her", "2013", "Film · Spike Jonze",
  "A warm, embodied AI companion — voice-first, no face, no screen — that audiences fell in love with alongside the protagonist.",
  "Every voice assistant since has been measured against Samantha. The film has literally shaped product design at OpenAI, Google, Apple.",
  "her",
  [
      {"kind": "product", "name": "ChatGPT voice mode", "desc": "OpenAI's 2024 voice demo was so Her-adjacent that Scarlett Johansson threatened to sue."},
      {"kind": "product", "name": "Humane AI Pin", "desc": "A screenless, voice-first AI wearable — literal Samantha form factor."},
      {"kind": "concept", "name": "AI companion archetype", "desc": "Replika, Pi, Character.ai — all draw from Her."},
  ])
e("ironMan", "imaginedInterfaces", "Iron Man", "2008", "Film · Favreau",
  "Tony Stark as hacker-genius with an AI butler so fluent it never broke a conversation.",
  "Jarvis crystallized the consumer fantasy of an intelligent, loyal, always-on AI assistant. Every LLM demo has been chasing it since.",
  "ironMan",
  [
      {"kind": "concept", "name": "AI assistant archetype", "desc": "Jarvis is the north star of consumer AI product design."},
      {"kind": "product", "name": "AR HUDs", "desc": "Meta Ray-Bans, Apple Vision Pro — Tony's heads-up display, now shipping."},
  ])
e("blackPanther", "imaginedInterfaces", "Black Panther", "2018", "Film · Ryan Coogler",
  "An Afrofuturist design language — Shuri's lab, Wakandan UI, kimoyo beads.",
  "A counter-tradition to Silicon Valley minimalism — ornate, textured, warm. Shaped a generation of Afrofuturist design.",
  "blackPanther",
  [
      {"kind": "concept", "name": "Afrofuturist product design", "desc": "Designers like Ini Archibong working in the lineage."},
      {"kind": "concept", "name": "Wearable tech aesthetic", "desc": "Kimoyo beads anticipated smart-jewelry form factors."},
  ])

# Tech Anxiety
e("terminator", "techAnxiety", "The Terminator", "1984", "Film · Cameron",
  "A defense AI becoming self-aware and deciding its creators are a threat.",
  "Skynet became the English word for 'AI that turns on us.' Every alignment debate includes the reference.",
  "terminator",
  [
      {"kind": "meme", "name": "'Skynet'", "desc": "Used in congressional testimony, AI safety research, casual conversation."},
      {"kind": "concept", "name": "AI existential risk", "desc": "The cultural seed of a now-serious field of research."},
  ])
e("warGames", "techAnxiety", "WarGames", "1983", "Film · Badham",
  "A teenager hacks into NORAD and nearly starts World War III.",
  "Prompted an actual National Security Directive. Influenced the Computer Fraud and Abuse Act of 1986. Set the template for the teen-hacker archetype.",
  "warGames",
  [
      {"kind": "concept", "name": "Computer Fraud and Abuse Act", "desc": "Reagan watched WarGames, asked aides if it could happen. Law followed."},
      {"kind": "meme", "name": "'Shall we play a game?'", "desc": "The tagline of AI uncertainty."},
      {"kind": "concept", "name": "The teen hacker archetype", "desc": "Every subsequent hacker film drafts on WarGames."},
  ])
e("matrixTa", "techAnxiety", "The Matrix", "1999", "Film · Wachowskis",
  "Reality as a simulation built to pacify human batteries.",
  "The simulation hypothesis entered popular discourse. Red pill / blue pill became political vocabulary. Bostrom's paper followed three years later.",
  "matrixTa",
  [
      {"kind": "concept", "name": "Simulation hypothesis", "desc": "From sci-fi premise to serious philosophical position."},
      {"kind": "meme", "name": "'Red pill / blue pill'", "desc": "Political vocabulary now, for better and worse."},
      {"kind": "meme", "name": "'Glitch in the Matrix'", "desc": "Subreddit. Common expression."},
  ])
e("blackMirror", "techAnxiety", "Black Mirror", "2011–", "TV · Charlie Brooker",
  "An anthology of near-future technology anxieties, each episode a self-contained dystopia.",
  "'It's like a Black Mirror episode' became shorthand for a tech development too dystopian to be real — then real.",
  "blackMirror",
  [
      {"kind": "meme", "name": "'We're in a Black Mirror episode'", "desc": "Universal reaction to each new controversial product."},
      {"kind": "concept", "name": "Nosedive / social credit", "desc": "The reference point for any ranking-system discussion."},
      {"kind": "concept", "name": "Tech journalism framing", "desc": "A generation of reviewers reads products through Black Mirror's lens."},
  ])
e("m3gan", "techAnxiety", "M3GAN", "2022", "Film · Johnstone",
  "An AI-companion doll for children that escalates from helpful to homicidal.",
  "Released as AI companions were becoming real. The timing made the film a mascot for AI-parenting anxieties.",
  "m3gan",
  [
      {"kind": "meme", "name": "'M3GAN'", "desc": "Invoked every time someone sees an AI toy in the wild."},
      {"kind": "concept", "name": "AI toy anxiety", "desc": "Framed the debate around Moxie and other AI children's products."},
  ])

# AI Imagination
e("exMachina", "aiImagination", "Ex Machina", "2014", "Film · Alex Garland",
  "A wealthy search-engine founder hosts an employee at his remote compound to evaluate his new robot.",
  "Reframed AI alignment as intimate deception. Nathan — paranoid genius in a remote lab — is now a common mental image of an AI founder.",
  "exMachina",
  [
      {"kind": "concept", "name": "Alignment / manipulation", "desc": "Cited in AI safety discourse — alignment as interpersonal deception."},
      {"kind": "concept", "name": "The founder compound", "desc": "Nathan prefigured a certain flavor of contemporary tech-compound living."},
  ])
e("westworld", "aiImagination", "Westworld", "2016", "TV · Nolan & Joy",
  "A theme park staffed by lifelike androids that begin to remember their mistreatment.",
  "Framed consciousness as recursive memory — a framing that echoes in LLM discussions today.",
  "westworld",
  [
      {"kind": "concept", "name": "The 'loop' metaphor", "desc": "Used in alignment research for agents caught in repeated behavior."},
  ])
e("afterYang", "aiImagination", "After Yang", "2021", "Film · Kogonada",
  "A family AI 'technosapien' breaks down. A grieving ritual for a machine companion.",
  "Reframed AI not as threat but as loss. Part of the cultural work of giving us an emotional vocabulary for AI in the home.",
  "afterYang",
  [
      {"kind": "concept", "name": "AI grief / attachment", "desc": "The vocabulary we use when a chatbot's personality changes."},
  ])
e("beRightBack", "aiImagination", "Black Mirror: Be Right Back", "2013", "TV · Charlie Brooker",
  "A woman hires a service to recreate her dead boyfriend from his social-media data.",
  "Predicted the 'grief bot' space years before it existed. Episode directly cited in journalism about HereAfter and Replika.",
  "beRightBack",
  [
      {"kind": "product", "name": "HereAfter AI / StoryFile", "desc": "Services that generate conversations with deceased relatives."},
      {"kind": "product", "name": "Replika", "desc": "Relational conversational AI, often compared to Be Right Back."},
  ])

# Founder Mythology
e("social", "mythMakers", "The Social Network", "2010", "Film · Fincher / Sorkin",
  "A mythology of the founder, rendered in the tempo of a deposition — brilliant, wronged, unyielding.",
  "Exported a template of Silicon Valley masculinity to a generation. Quoted in the self-presentation of countless founders since.",
  "social",
  [
      {"kind": "person", "name": "Mark Zuckerberg", "desc": "The film mythologized him as he was becoming the most powerful person in social media."},
      {"kind": "company", "name": "Meta (Facebook)", "desc": "The film is now an indelible part of the company's origin story."},
      {"kind": "concept", "name": "The founder template", "desc": "Hoodie, emotional distance, wronged-genius framing — now ubiquitous."},
  ])
e("sv", "mythMakers", "Silicon Valley", "2014–2019", "TV · HBO · Mike Judge",
  "Explaining a Series A, a vesting schedule, and a pivot to the broad viewing public — with jokes that worked for people inside the industry too.",
  "Taught a generation the vocabulary of venture capital. The Pied Piper compression algorithm was partially implemented in real life.",
  "sv",
  [
      {"kind": "software", "name": "Pied Piper compression", "desc": "Partially implemented by Stanford researchers."},
      {"kind": "concept", "name": "VC vocabulary", "desc": "'Conjoined triangles of success', hot-dog / not-hot-dog, pivot as verb."},
  ])
e("steveJobs", "mythMakers", "Steve Jobs", "2015", "Film · Boyle / Sorkin",
  "Jobs mythology rendered as a three-act backstage drama before each keynote.",
  "Solidified the Jobs archetype: cruel, visionary, unyielding — a template that powered a decade of bad founder behavior.",
  "steveJobs",
  [
      {"kind": "person", "name": "Steve Jobs", "desc": "The cinematic version now shapes public memory of the real man."},
      {"kind": "concept", "name": "Visionary-asshole trope", "desc": "Used to rationalize workplace cruelty across the industry."},
  ])
e("dropout", "theFall", "The Dropout", "2022", "TV · Hulu",
  "Elizabeth Holmes' rise, fraud, and fall — rendered as a miniseries drama.",
  "Crystallized the Holmes archetype in popular memory, and turned 'fake it till you make it' from aspiration into warning.",
  "dropout",
  [
      {"kind": "person", "name": "Elizabeth Holmes", "desc": "Convicted 2022; now serving 11 years. The show's image is her public image."},
      {"kind": "company", "name": "Theranos", "desc": "Defunct. The 'Edison' device became an emblem of Valley hubris."},
      {"kind": "concept", "name": "'Fake it till you make it' skepticism", "desc": "The Holmes story shifted Valley attitudes toward the phrase."},
  ])
e("weCrashed", "theFall", "WeCrashed", "2022", "TV · Apple TV+",
  "Adam Neumann's ascent and collapse at WeWork.",
  "Made the Neumann mythology accessible. Turned the IPO collapse into a popular morality play about VC enabling.",
  "weCrashed",
  [
      {"kind": "person", "name": "Adam Neumann", "desc": "Founder of WeWork and Flow. The show shaped his public image."},
      {"kind": "company", "name": "WeWork", "desc": "From $47B valuation to bankruptcy — a cautionary tale."},
  ])
e("superPumped", "theFall", "Super Pumped", "2022", "TV · Showtime",
  "Travis Kalanick's reign at Uber — the 'move fast, burn everything' era.",
  "Cemented the Kalanick archetype alongside Holmes and Neumann as founder-antihero.",
  "superPumped",
  [
      {"kind": "person", "name": "Travis Kalanick", "desc": "Ousted from Uber in 2017. The show became his public narrative."},
      {"kind": "company", "name": "Uber", "desc": "The platform as cultural object, scrutinized through Kalanick's choices."},
  ])
e("piratesSv", "mythMakers", "Pirates of Silicon Valley", "1999", "TV · TNT",
  "Jobs and Gates, side by side, in the 1970s–80s origin moment.",
  "The first pop mythology of the personal computer era. Much of what the public thinks it knows about Jobs and Gates traces here.",
  "piratesSv",
  [
      {"kind": "concept", "name": "Origin-era tech mythology", "desc": "Set the pattern for later founder biopics."},
  ])
e("air", "mythMakers", "Air", "2023", "Film · Ben Affleck",
  "Sonny Vaccaro's quiet heroics at Nike landing the Michael Jordan deal.",
  "A rare founder-movie about the deal and the salesman, not the product.",
  "air",
  [
      {"kind": "concept", "name": "The corporate-deal biopic", "desc": "A new subgenre — the person who did the deal."},
  ])

# Fiction Made Real
e("bttf2", "fictionMadeReal", "Back to the Future Part II", "1989", "Film · Zemeckis",
  "A vision of 2015 — hoverboards, self-lacing Nike shoes, wall-sized flat screens, video calls.",
  "Nike literally built the shoes. Hoverboards came, then fizzled. Video calls became universal. The movie is now a checklist.",
  "bttf2",
  [
      {"kind": "product", "name": "Nike Mag (2016)", "desc": "Nike produced 89 working self-lacing pairs, auctioned for Michael J. Fox's foundation."},
      {"kind": "product", "name": "Hendo Hoverboard", "desc": "Magnetic-levitation; worked on copper surfaces only."},
      {"kind": "product", "name": "FaceTime / Zoom", "desc": "The family video call from McFly's 2015 kitchen — now universal."},
      {"kind": "product", "name": "Flat-screen TVs", "desc": "The wall-sized multi-window display — essentially modern television."},
  ])
e("totalRecall", "fictionMadeReal", "Total Recall", "1990", "Film · Verhoeven",
  "Johnny Cab — a self-driving robotic taxi with a creepy dashboard mannequin.",
  "The earliest iconic depiction of a self-driving taxi. Waymo and its peers arrived ~30 years later.",
  "totalRecall",
  [
      {"kind": "product", "name": "Waymo", "desc": "Commercial self-driving taxi service, operating in Phoenix, SF, LA."},
      {"kind": "concept", "name": "Robo-taxi as category", "desc": "Cruise, Zoox, the entire autonomous-mobility industry."},
  ])
e("missionImpossible", "fictionMadeReal", "Mission: Impossible", "1996", "Film · De Palma",
  "Face-swap latex masks, biometric retinal scanners, voice-mimicry — espionage as applied technology.",
  "Normalized biometrics in the popular imagination just before fingerprint and face ID shipped to consumer devices.",
  "missionImpossible",
  [
      {"kind": "product", "name": "Apple Face ID (2017)", "desc": "Biometric identity became consumer-default a decade later."},
      {"kind": "concept", "name": "Voice cloning", "desc": "ElevenLabs, OpenAI voice — the MI plot device, shipping."},
  ])

# Hacker Archetypes
e("hackers", "hackerArchetypes", "Hackers", "1995", "Film · Iain Softley",
  "New York skater-teen hackers rollerblading through a neon-lit cyberpunk aesthetic.",
  "Established the hacker as stylish outsider. 'Hack the planet' entered the vocabulary. Influenced the visual language for 30 years.",
  "hackers",
  [
      {"kind": "meme", "name": "'Hack the planet'", "desc": "Still uttered in hacker subculture, now often ironically."},
      {"kind": "concept", "name": "Hacker as style", "desc": "An aesthetic shorthand that persists in Mr. Robot and beyond."},
  ])
e("sneakers", "hackerArchetypes", "Sneakers", "1992", "Film · Phil Alden Robinson",
  "A penetration-testing crew — old spies, young hackers — contracted to break into corporate systems.",
  "Introduced the public to the concept of paid security auditors. Social engineering was shown as central to security before the industry agreed.",
  "sneakers",
  [
      {"kind": "concept", "name": "Pen testing / red teams", "desc": "Professionalized security auditing owes its public image here."},
      {"kind": "concept", "name": "Social engineering", "desc": "The film made clear that the weakest link was human."},
  ])
e("theNet", "hackerArchetypes", "The Net", "1995", "Film · Irwin Winkler",
  "A software engineer's identity is erased online while she's on vacation.",
  "The first mainstream thriller on identity theft. Came before it was routine; predicted it accurately.",
  "theNet",
  [
      {"kind": "concept", "name": "Identity theft as category", "desc": "By 2005 a billion-dollar industry — anticipated a decade early."},
  ])
e("mrRobot", "hackerArchetypes", "Mr. Robot", "2015–2019", "TV · Sam Esmail",
  "A hacker with dissociative identity disorder attacks an evil megacorp. The hacking on screen is actually accurate.",
  "The first show to earn security-community respect. Every command on screen was consulted on. Re-legitimized hacker TV.",
  "mrRobot",
  [
      {"kind": "concept", "name": "Accurate hacking on TV", "desc": "Raised the bar for every subsequent tech show."},
      {"kind": "concept", "name": "Infosec as identity", "desc": "Helped normalize infosec career paths to a broader audience."},
  ])

# ─── WRITE THE JSX ARTIFACT ────────────────────────────────────────────────

def js(val):
    """Serialize Python object as JS literal."""
    return json.dumps(val, ensure_ascii=False)

SUBWINGS_JS = js(SUBWINGS)
ROOMS_JS = js(ROOMS)
EXHIBITS_JS = js(E)
POSTERS_JS = js(POSTERS)

artifact = r"""
import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";

/* ══════════════════════════════════════════════════════════════════
   SILVER NITRATE & SILICON
   The Museum — Wing I
   One canvas. You explore, not scroll.
   ════════════════════════════════════════════════════════════════ */

const HALL_PALETTE = {
  bg: "#f5f2ec", ink: "#1a1714", dim: "#8a847a",
  faint: "#cfc7b9", accent: "#b65a3d", tone: "#eae5db",
};

const SUBWINGS  = __SUBWINGS__;
const ROOMS     = __ROOMS__;
const EXHIBITS  = __EXHIBITS__;
const POSTERS   = __POSTERS__;

/* ─────────────────────── HELPERS ─────────────────────── */

function usePar() {
  const [p, setP] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let raf = null;
    const f = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setP({ x, y }));
    };
    window.addEventListener("mousemove", f);
    return () => { window.removeEventListener("mousemove", f); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return p;
}

function getPalette(openSubwing) {
  if (!openSubwing) return HALL_PALETTE;
  const sw = SUBWINGS.find(s => s.id === openSubwing);
  return sw ? sw.palette : HALL_PALETTE;
}

/* Exhibit positions — fan around the room's position */
function exhibitPositionsAround(roomPos, count) {
  // Small cluster around the room's x/y (within canvas bounds)
  const out = [];
  const cx = parseFloat(roomPos.left);
  const cy = parseFloat(roomPos.top);
  // Fan upward from the room
  const rows = count <= 3 ? 1 : 2;
  const perRow = Math.ceil(count / rows);
  const rowH = 16;  // percent of canvas between rows
  const colW = 10;  // percent between columns
  let k = 0;
  for (let r = 0; r < rows && k < count; r++) {
    const inRow = Math.min(perRow, count - k);
    const startX = cx - ((inRow - 1) * colW) / 2;
    for (let c = 0; c < inRow; c++) {
      // fan upward (exhibits appear above the room label)
      const x = startX + c * colW + (r % 2 === 0 ? 0 : colW / 2);
      const y = cy - 24 - r * rowH;
      out.push({ left: `${x}%`, top: `${y}%` });
      k++;
    }
  }
  return out;
}

/* ─────────────────────── ART ─────────────────────── */

function PosterImg({ artKey, palette, tint = 0 }) {
  const src = POSTERS[artKey];
  if (!src) return <AbstractArt id={artKey} palette={palette} />;
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden",
                  background: palette.tone }}>
      <img src={src} alt="" loading="lazy"
           style={{ width: "100%", height: "100%", objectFit: "cover", display: "block",
                    filter: "saturate(0.9) contrast(0.97)" }} />
      {tint > 0 && (
        <div style={{ position: "absolute", inset: 0, background: palette.accent,
                      mixBlendMode: "multiply", opacity: tint }} />
      )}
    </div>
  );
}

function AbstractArt({ id, palette }) {
  const a = palette.accent, i = palette.ink, t = palette.tone;
  const common = { viewBox: "0 0 300 400", preserveAspectRatio: "xMidYMid slice",
                   style: { width: "100%", height: "100%", display: "block" } };
  // Minimal fallbacks per known id — used for software exhibits
  if (id === "photoshop") {
    return (
      <svg {...common}>
        <rect width="300" height="400" fill={t} />
        <rect x="60" y="90" width="180" height="220" fill="none" stroke={a} strokeWidth="2" />
        <path d="M 60 310 L 130 220 L 170 260 L 240 160" fill="none" stroke={a} strokeWidth="2" />
        <circle cx="215" cy="175" r="12" fill={a} opacity="0.4" />
      </svg>
    );
  }
  if (id === "renderman") {
    return (
      <svg {...common}>
        <rect width="300" height="400" fill={t} />
        <circle cx="150" cy="200" r="90" fill="none" stroke={a} strokeWidth="1.5" />
        <circle cx="150" cy="200" r="60" fill={a} opacity="0.22" />
        <circle cx="130" cy="180" r="10" fill={t} />
      </svg>
    );
  }
  if (id === "avid") {
    return (
      <svg {...common}>
        <rect width="300" height="400" fill={t} />
        {[120, 170, 220, 270].map((y, k) => (
          <g key={k}>
            <line x1="30" y1={y} x2="270" y2={y} stroke={a} strokeOpacity="0.22" />
            <rect x={50 + k * 16} y={y - 10} width={120 - k * 12} height="20" fill={a} opacity="0.6" />
          </g>
        ))}
      </svg>
    );
  }
  if (id === "nuke") {
    return (
      <svg {...common}>
        <rect width="300" height="400" fill={t} />
        <g stroke={a} strokeWidth="1" fill="none" opacity="0.9">
          {[0,1,2,3].map(k => (
            <rect key={k} x={40 + (k%2)*120} y={80 + Math.floor(k/2)*140} width="100" height="70" />
          ))}
          <line x1="140" y1="115" x2="160" y2="115" />
          <line x1="140" y1="255" x2="160" y2="255" />
          <line x1="90" y1="150" x2="90" y2="220" />
          <line x1="210" y1="150" x2="210" y2="220" />
        </g>
      </svg>
    );
  }
  // Generic
  return (
    <svg {...common}>
      <rect width="300" height="400" fill={t} />
      <g opacity="0.8" stroke={a} strokeWidth="0.8" fill="none">
        {Array.from({ length: 9 }).map((_, k) => (
          <rect key={k} x={40 + k * 14} y={40 + k * 18} width={220 - k * 28} height={320 - k * 36} />
        ))}
      </g>
      <circle cx="150" cy="200" r="5" fill={i} />
    </svg>
  );
}

/* ─────────────────────── DESCENDANT ICONS ─────────────────────── */

function DescendantCard({ d, palette }) {
  const { bg, accent, ink, tone } = palette;
  return (
    <div style={{ width: 140, textAlign: "left" }}>
      <div style={{
        width: 140, height: 110, background: tone, position: "relative",
        overflow: "hidden", border: `1px solid ${palette.faint || "#ddd"}`,
      }}>
        <DescendantIcon kind={d.kind} name={d.name} palette={palette} />
      </div>
      <div style={{
        marginTop: 8, fontFamily: '"JetBrains Mono", monospace',
        fontSize: 8.5, letterSpacing: "0.18em", textTransform: "uppercase",
        color: palette.accent,
      }}>{d.kind}</div>
      <div style={{
        marginTop: 4, fontFamily: '"Fraunces", Georgia, serif',
        fontSize: 13, lineHeight: 1.25, color: palette.ink,
      }}>{d.name}</div>
      <div style={{
        marginTop: 4, fontFamily: '"Fraunces", Georgia, serif',
        fontStyle: "italic", fontSize: 11, lineHeight: 1.4, color: palette.dim,
      }}>{d.desc}</div>
    </div>
  );
}

function DescendantIcon({ kind, name, palette }) {
  const { accent, ink, tone } = palette;
  const initial = (name || "?").split(/[\s:\/]/)[0].slice(0, 3).toUpperCase();
  const common = {
    viewBox: "0 0 140 110", preserveAspectRatio: "xMidYMid slice",
    style: { width: "100%", height: "100%", display: "block" },
  };
  switch (kind) {
    case "person":
      return (
        <svg {...common}>
          <rect width="140" height="110" fill={tone} />
          <circle cx="70" cy="44" r="18" fill={accent} opacity="0.35" />
          <path d="M 30 100 Q 70 68 110 100 Z" fill={accent} opacity="0.28" />
        </svg>
      );
    case "company":
      return (
        <svg {...common}>
          <rect width="140" height="110" fill={tone} />
          <rect x="18" y="38" width="104" height="34" fill="none" stroke={accent} strokeWidth="1.5" />
          <text x="70" y="60" textAnchor="middle" fontFamily="'Fraunces', serif"
                fontSize="14" fill={ink} letterSpacing="2">{initial}</text>
        </svg>
      );
    case "product":
      return (
        <svg {...common}>
          <rect width="140" height="110" fill={tone} />
          <rect x="52" y="22" width="36" height="66" rx="6" fill="none" stroke={accent} strokeWidth="1.5" />
          <rect x="58" y="30" width="24" height="42" fill={accent} opacity="0.18" />
          <circle cx="70" cy="82" r="2.5" fill={accent} />
        </svg>
      );
    case "device":
      return (
        <svg {...common}>
          <rect width="140" height="110" fill={tone} />
          <rect x="32" y="32" width="76" height="50" rx="4" fill="none" stroke={accent} strokeWidth="1.5" />
          <circle cx="70" cy="57" r="8" fill={accent} opacity="0.35" />
          <circle cx="70" cy="57" r="3" fill={accent} />
        </svg>
      );
    case "software":
      return (
        <svg {...common}>
          <rect width="140" height="110" fill={tone} />
          <rect x="22" y="24" width="96" height="62" fill="none" stroke={accent} strokeWidth="1.5" />
          <line x1="22" y1="38" x2="118" y2="38" stroke={accent} strokeOpacity="0.5" />
          <circle cx="30" cy="31" r="2" fill={accent} opacity="0.5" />
          <circle cx="38" cy="31" r="2" fill={accent} opacity="0.5" />
          <circle cx="46" cy="31" r="2" fill={accent} opacity="0.5" />
          <rect x="32" y="48" width="40" height="4" fill={accent} opacity="0.3" />
          <rect x="32" y="58" width="60" height="4" fill={accent} opacity="0.3" />
          <rect x="32" y="68" width="30" height="4" fill={accent} opacity="0.3" />
        </svg>
      );
    case "concept":
      return (
        <svg {...common}>
          <rect width="140" height="110" fill={tone} />
          <g stroke={accent} strokeWidth="1" fill="none" opacity="0.9">
            <circle cx="50" cy="55" r="20" />
            <circle cx="90" cy="55" r="20" />
            <circle cx="70" cy="55" r="8" fill={accent} fillOpacity="0.3" />
          </g>
        </svg>
      );
    case "meme":
      return (
        <svg {...common}>
          <rect width="140" height="110" fill={tone} />
          <path d="M 25 25 L 115 25 L 115 70 L 78 70 L 65 85 L 65 70 L 25 70 Z"
                fill="none" stroke={accent} strokeWidth="1.5" />
          <text x="70" y="53" textAnchor="middle" fontFamily="'Fraunces', serif"
                fontSize="22" fontStyle="italic" fill={ink}>"</text>
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect width="140" height="110" fill={tone} />
          <rect x="40" y="30" width="60" height="50" fill="none" stroke={accent} />
        </svg>
      );
  }
}

/* ─────────────────────── FLOATING NODE ─────────────────────── */

function FloatingNode({ pos, size = 160, rotate = 0, depth = 1, visible, delay = 0,
                        onClick, palette, children }) {
  const [hover, setHover] = useState(false);
  const par = usePar();
  const dx = par.x * 8 * depth;
  const dy = par.y * 8 * depth;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "absolute",
        left: pos.left,
        top: pos.top,
        width: size,
        transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) ` +
                   `rotate(${rotate}deg) ` +
                   `${hover && visible ? "scale(1.04) translateY(-4px)" : ""}`,
        transition: `transform 800ms cubic-bezier(.2,.8,.2,1), opacity 650ms cubic-bezier(.2,.8,.2,1) ${delay}ms`,
        cursor: visible ? "pointer" : "default",
        pointerEvents: visible ? "auto" : "none",
        opacity: visible ? 1 : 0,
      }}
    >
      {children({ hover })}
    </div>
  );
}

/* ─────────────────────── CHROME ─────────────────────── */

function Wordmark({ palette, breadcrumb }) {
  return (
    <div style={{
      position: "absolute", top: 28, left: 32, zIndex: 5,
      display: "flex", alignItems: "center", gap: 14, pointerEvents: "none",
    }}>
      <div style={{ width: 10, height: 10, border: `1px solid ${palette.ink}`,
                    transform: "rotate(45deg)" }} />
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
        letterSpacing: "0.2em", textTransform: "uppercase", color: palette.dim,
      }}>
        Silver Nitrate &nbsp;·&nbsp; Silicon{breadcrumb ? `  /  ${breadcrumb}` : ""}
      </div>
    </div>
  );
}

function FloorLabel({ palette, kicker, title, whisper }) {
  return (
    <div style={{ position: "absolute", left: 32, bottom: 30, maxWidth: 380,
                  zIndex: 5, pointerEvents: "none" }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
        letterSpacing: "0.22em", textTransform: "uppercase",
        color: palette.accent, marginBottom: 10,
      }}>{kicker}</div>
      <div style={{
        fontFamily: '"Fraunces", Georgia, serif', fontWeight: 300,
        fontSize: 40, lineHeight: 0.98, color: palette.ink, letterSpacing: "-0.015em",
      }}>{title}</div>
      {whisper && (
        <div style={{
          marginTop: 14, fontFamily: '"Fraunces", Georgia, serif',
          fontStyle: "italic", fontSize: 13, lineHeight: 1.5, color: palette.dim,
        }}>{whisper}</div>
      )}
    </div>
  );
}

function Recorder({ on, toggle, palette }) {
  return (
    <button onClick={toggle} style={{
      position: "fixed", right: 28, bottom: 24, zIndex: 20,
      background: "transparent", border: "none", cursor: "pointer",
      display: "flex", alignItems: "center", gap: 10, padding: 6,
    }}>
      <svg width="42" height="22" viewBox="0 0 60 34">
        <circle cx="16" cy="17" r="10" fill="none" stroke={palette.dim} />
        <circle cx="16" cy="17" r="2.5" fill={palette.accent} opacity={on ? 1 : 0.4}>
          {on && <animateTransform attributeName="transform" type="rotate"
                 from="0 16 17" to="360 16 17" dur="4s" repeatCount="indefinite" />}
        </circle>
        <circle cx="44" cy="17" r="10" fill="none" stroke={palette.dim} />
        <circle cx="44" cy="17" r="2.5" fill={palette.accent} opacity={on ? 1 : 0.4}>
          {on && <animateTransform attributeName="transform" type="rotate"
                 from="0 44 17" to="360 44 17" dur="4s" repeatCount="indefinite" />}
        </circle>
        <line x1="26" y1="17" x2="34" y2="17" stroke={palette.dim} />
      </svg>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
        letterSpacing: "0.22em", textTransform: "uppercase", color: palette.dim,
      }}>{on ? "Room · Breathing" : "Room · Quiet"}</div>
    </button>
  );
}

/* ─────────────────────── DETAIL MODAL ─────────────────────── */

function ExhibitModal({ ex, close, palette }) {
  if (!ex) return null;
  return (
    <div onClick={close} style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: `${palette.bg}ee`,
      display: "flex", justifyContent: "center", alignItems: "center",
      padding: 36, animation: "fadeIn 400ms ease",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        maxWidth: 920, width: "100%", maxHeight: "92vh", overflowY: "auto",
        animation: "riseIn 600ms cubic-bezier(.2,.8,.2,1)",
        padding: "24px 44px 48px",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 42, alignItems: "start" }}>
          <div style={{ aspectRatio: "2 / 3", overflow: "hidden",
                        boxShadow: "0 24px 48px -18px rgba(0,0,0,.3)" }}>
            <PosterImg artKey={ex.art} palette={palette} />
          </div>
          <div>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: palette.accent, marginBottom: 12,
            }}>{ex.year} · {ex.medium}</div>
            <h2 style={{
              fontFamily: '"Fraunces", Georgia, serif', fontWeight: 300,
              fontSize: 40, lineHeight: 1.02, margin: 0, marginBottom: 24,
              color: palette.ink, letterSpacing: "-0.015em",
            }}>{ex.title}</h2>

            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                          letterSpacing: "0.22em", textTransform: "uppercase",
                          color: palette.dim, marginBottom: 6 }}>Demand</div>
            <p style={{ fontFamily: '"Fraunces", Georgia, serif', fontSize: 15,
                        lineHeight: 1.55, color: palette.ink, margin: "0 0 20px" }}>
              {ex.demand}
            </p>

            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                          letterSpacing: "0.22em", textTransform: "uppercase",
                          color: palette.dim, marginBottom: 6 }}>Legacy</div>
            <p style={{ fontFamily: '"Fraunces", Georgia, serif', fontSize: 15,
                        lineHeight: 1.55, color: palette.ink, margin: "0 0 32px" }}>
              {ex.legacy}
            </p>
          </div>
        </div>

        {ex.descendants?.length > 0 && (
          <div style={{ marginTop: 10, paddingTop: 28, borderTop: `1px solid ${palette.faint}` }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                          letterSpacing: "0.22em", textTransform: "uppercase",
                          color: palette.accent, marginBottom: 20 }}>Descendants</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 28, rowGap: 32 }}>
              {ex.descendants.map((d, i) => (
                <DescendantCard key={i} d={d} palette={palette} />
              ))}
            </div>
          </div>
        )}

        <button onClick={close} style={{
          marginTop: 36, background: "transparent", border: "none", padding: 0,
          cursor: "pointer", color: palette.dim,
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
          letterSpacing: "0.22em", textTransform: "uppercase",
        }}>← Close</button>
      </div>
    </div>
  );
}

/* ─────────────────────── DESCENDANT SATELLITE (inline) ─────────────────────── */

function DescendantSatellite({ d, pos, palette, delay }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "absolute",
        left: pos.left, top: pos.top,
        width: 110,
        transform: "translate(-50%, -50%)",
        animation: `riseIn 600ms cubic-bezier(.2,.8,.2,1) ${delay}ms both`,
        zIndex: hover ? 30 : 6,
      }}
    >
      <div style={{
        width: 70, height: 56, margin: "0 auto",
        background: palette.tone,
        border: `1px solid ${palette.faint}`,
        overflow: "hidden",
        boxShadow: hover
          ? `0 12px 24px -10px rgba(0,0,0,0.25)`
          : `0 4px 12px -6px rgba(0,0,0,0.15)`,
        transition: "box-shadow 400ms",
      }}>
        <DescendantIcon kind={d.kind} name={d.name} palette={palette} />
      </div>
      <div style={{
        marginTop: 6, textAlign: "center",
        fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: palette.accent,
      }}>{d.kind}</div>
      <div style={{
        marginTop: 3, textAlign: "center",
        fontFamily: '"Fraunces", Georgia, serif', fontSize: 11,
        lineHeight: 1.2, color: palette.ink,
      }}>{d.name}</div>
      <div style={{
        marginTop: 4, textAlign: "center",
        fontFamily: '"Fraunces", Georgia, serif', fontStyle: "italic",
        fontSize: 9.5, lineHeight: 1.35, color: palette.dim,
      }}>{d.desc}</div>
    </div>
  );
}

/* Position descendants in a row below the selected exhibit, wrapping above
   if there's not enough room. Returns array of {left, top} percent strings. */
function descendantLayout(exPos, n) {
  const cx = parseFloat(exPos.left);
  const cy = parseFloat(exPos.top);
  const perRow = n <= 4 ? n : Math.ceil(n / 2);
  const rows = Math.ceil(n / perRow);
  const spacingX = 9;
  const spacingY = 13;
  const baseY = cy + 22;
  const flipUp = baseY + (rows - 1) * spacingY > 92;
  const positions = [];
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / perRow);
    const c = i % perRow;
    const inThisRow = Math.min(perRow, n - r * perRow);
    const startX = cx - ((inThisRow - 1) * spacingX) / 2;
    const x = startX + c * spacingX;
    const y = flipUp ? cy - 22 - (rows - 1 - r) * spacingY : baseY + r * spacingY;
    positions.push({ left: `${x}%`, top: `${y}%` });
  }
  return positions;
}

/* ─────────────────────── BACK BUTTON ─────────────────────── */

function BackButton({ palette, onClick, label }) {
  return (
    <button onClick={onClick} style={{
      position: "absolute", top: 26, right: 32, zIndex: 6,
      background: "transparent", border: "none", cursor: "pointer", padding: 4,
      fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
      letterSpacing: "0.22em", textTransform: "uppercase", color: palette.dim,
    }}>← {label}</button>
  );
}

/* ─────────────────────── MAIN ─────────────────────── */

export default function Museum() {
  const [view, setView] = useState({ type: "hall" });
  const [selectedExhibit, setSelectedExhibit] = useState(null);
  const [musicOn, setMusicOn] = useState(false);
  const [fading, setFading] = useState(false);
  const tone = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300..600;1,300..500&family=JetBrains+Mono:wght@300;400&display=swap";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  useEffect(() => {
    const reverb = new Tone.Reverb({ decay: 12, wet: 0.7 }).toDestination();
    const filter = new Tone.Filter(480, "lowpass").connect(reverb);
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 7, decay: 4, sustain: 0.85, release: 9 },
    }).connect(filter);
    synth.volume.value = -22;
    const chords = [
      ["C3","E3","G3","B3"], ["A2","C3","E3","G3"],
      ["F2","A2","C3","E3"], ["G2","B2","D3","F3"],
    ];
    let i = 0;
    const loop = new Tone.Loop((t) => {
      synth.triggerAttackRelease(chords[i % 4], 8, t); i++;
    }, 9);
    tone.current = { synth, loop, reverb, filter };
    return () => { loop.dispose(); synth.dispose(); reverb.dispose(); filter.dispose(); };
  }, []);

  const toggleMusic = async () => {
    await Tone.start();
    const { loop } = tone.current;
    if (musicOn) { loop.stop(); Tone.Transport.stop(); setMusicOn(false); }
    else { loop.start(0); Tone.Transport.start(); setMusicOn(true); }
  };

  const go = (next) => {
    setFading(true);
    setSelectedExhibit(null);
    setTimeout(() => {
      setView(next);
      setTimeout(() => setFading(false), 50);
    }, 420);
  };

  const palette =
    view.type === "hall" ? HALL_PALETTE
    : view.type === "subwing" ? SUBWINGS.find(s => s.id === view.id).palette
    : SUBWINGS.find(s => s.id === view.subwing).palette;

  let breadcrumb = null;
  let floor = null;
  let backLabel = null, backTo = null;

  if (view.type === "hall") {
    floor = {
      kicker: "Wing · Cinema & Technology",
      title: <>Silver Nitrate<br/>&nbsp;&amp; Silicon</>,
      whisper: "A wing devoted to cinema, as told through its technology. Four doorways open from this hall — click to enter.",
    };
  } else if (view.type === "subwing") {
    const sw = SUBWINGS.find(s => s.id === view.id);
    breadcrumb = sw.title;
    floor = {
      kicker: `Sub-Wing ${sw.numeral}`,
      title: sw.title,
      whisper: sw.subtitle + ". Click any room to enter.",
    };
    backLabel = "Hall"; backTo = { type: "hall" };
  } else if (view.type === "room") {
    const sw = SUBWINGS.find(s => s.id === view.subwing);
    const r  = ROOMS.find(x => x.id === view.id);
    breadcrumb = `${sw.title} / ${r.title}`;
    const exCount = Object.values(EXHIBITS).filter(e => e.room === r.id).length;
    floor = {
      kicker: `Gallery · ${exCount} exhibits`,
      title: r.title,
      whisper: r.blurb + " Click any exhibit to see what it produced.",
    };
    backLabel = sw.title; backTo = { type: "subwing", id: view.subwing };
  }

  const exhibitsForRoom = view.type === "room"
    ? Object.entries(EXHIBITS)
        .filter(([, v]) => v.room === view.id)
        .map(([k, v]) => ({ id: k, ...v }))
    : [];

  // Lay exhibits in a generous scatter using deterministic positions
  function exhibitScatter(n) {
    const positions = [];
    const cols = n <= 3 ? n : Math.ceil(Math.sqrt(n + 1));
    const rows = Math.ceil(n / cols);
    const padX = 16, padY = 18;
    const w = (100 - padX * 2) / cols;
    const h = (60 - padY) / Math.max(rows - 1, 1);
    for (let i = 0; i < n; i++) {
      const r = Math.floor(i / cols);
      const c = i % cols;
      const offset = r % 2 === 0 ? 0 : w / 4;
      const jitter = ((i * 9301 + 49297) % 233280) / 233280;
      const dx = (jitter - 0.5) * 4;
      positions.push({
        left: `${padX + c * w + w / 2 + offset + dx}%`,
        top:  `${padY + 12 + r * h}%`,
        rotate: (i % 2 === 0 ? -1.4 : 1.2),
      });
    }
    return positions;
  }
  const exhibitPositions = exhibitScatter(exhibitsForRoom.length);

  return (
    <div style={{
      minHeight: "100vh", height: "100vh", width: "100vw",
      background: palette.bg, color: palette.ink,
      position: "relative", overflow: "hidden",
      transition: "background 1100ms ease, color 1100ms ease",
      fontFamily: '"Fraunces", Georgia, serif',
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes riseIn { from { opacity: 0; transform: translateY(18px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes drawIn { to { stroke-dashoffset: 0 } }
        button:focus { outline: none; }
        button:focus-visible { outline: 1px dashed currentColor; outline-offset: 4px; }
        * { -webkit-font-smoothing: antialiased; }
        body, html { margin: 0; padding: 0; }
      `}</style>

      <Wordmark palette={palette} breadcrumb={breadcrumb} />
      <FloorLabel palette={palette} kicker={floor.kicker} title={floor.title} whisper={floor.whisper} />
      {backTo && <BackButton palette={palette} onClick={() => go(backTo)} label={backLabel} />}

      <div style={{
        position: "absolute", inset: 0,
        opacity: fading ? 0 : 1,
        transition: "opacity 420ms ease",
      }}>
        {/* HALL — four sub-wing doorways */}
        {view.type === "hall" && SUBWINGS.map((sw, idx) => (
          <FloatingNode key={sw.id} pos={sw.pos} size={180}
                        rotate={sw.rotate} depth={1.0} visible
                        delay={idx * 80}
                        onClick={() => go({ type: "subwing", id: sw.id })}
                        palette={palette}>
            {() => (
              <div>
                <div style={{
                  aspectRatio: "4 / 5", overflow: "hidden",
                  boxShadow: `0 14px 30px -14px rgba(0,0,0,.22)`,
                }}>
                  <PosterImg artKey={sw.hero_art} palette={sw.palette} tint={0.1} />
                </div>
                <div style={{
                  marginTop: 12,
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: palette.accent, marginBottom: 5,
                }}>Sub-Wing · {sw.numeral}</div>
                <div style={{
                  fontFamily: '"Fraunces", Georgia, serif', fontWeight: 400,
                  fontSize: 17, lineHeight: 1.15, color: palette.ink, marginBottom: 4,
                }}>{sw.title}</div>
                <div style={{
                  fontFamily: '"Fraunces", Georgia, serif', fontStyle: "italic",
                  fontSize: 11.5, lineHeight: 1.35, color: palette.dim,
                }}>{sw.subtitle}</div>
              </div>
            )}
          </FloatingNode>
        ))}

        {/* SUBWING — rooms scattered on its own page */}
        {view.type === "subwing" && ROOMS.filter(r => r.subwing === view.id).map((r, idx) => (
          <FloatingNode key={r.id} pos={r.pos} size={140}
                        rotate={r.rotate} depth={0.8} visible
                        delay={idx * 80}
                        onClick={() => go({ type: "room", subwing: view.id, id: r.id })}
                        palette={palette}>
            {() => (
              <div>
                <div style={{
                  aspectRatio: "4 / 5", overflow: "hidden",
                  boxShadow: `0 12px 26px -14px rgba(0,0,0,.25)`,
                }}>
                  {r.hero_art
                    ? <PosterImg artKey={r.hero_art} palette={palette} tint={0.05} />
                    : <AbstractArt id="escapees" palette={palette} />}
                </div>
                <div style={{
                  marginTop: 10, fontFamily: '"Fraunces", Georgia, serif',
                  fontSize: 14, lineHeight: 1.2, color: palette.ink,
                }}>{r.title}</div>
                <div style={{
                  marginTop: 4, fontFamily: '"Fraunces", Georgia, serif',
                  fontStyle: "italic", fontSize: 10.5, lineHeight: 1.35, color: palette.dim,
                }}>{r.blurb}</div>
              </div>
            )}
          </FloatingNode>
        ))}

        {/* ROOM — exhibits scattered, click expands inline */}
        {view.type === "room" && exhibitsForRoom.map((ex, idx) => {
          const pos = exhibitPositions[idx] || { left: "50%", top: "50%", rotate: 0 };
          const isSel  = selectedExhibit === ex.id;
          const isDim  = selectedExhibit && !isSel;
          return (
            <div key={ex.id} style={{
              position: "absolute", left: pos.left, top: pos.top,
              transform: `translate(-50%, -50%) rotate(${isSel ? 0 : pos.rotate}deg) ${isSel ? "scale(1.15)" : ""}`,
              transition: "transform 700ms cubic-bezier(.2,.8,.2,1), opacity 600ms ease",
              opacity: isDim ? 0.18 : 1,
              cursor: "pointer", width: 100,
              zIndex: isSel ? 20 : 5,
              animation: `riseIn 700ms cubic-bezier(.2,.8,.2,1) ${idx * 60}ms both`,
            }} onClick={() => setSelectedExhibit(prev => prev === ex.id ? null : ex.id)}>
              <div style={{
                aspectRatio: "2 / 3", overflow: "hidden",
                boxShadow: isSel
                  ? `0 22px 44px -16px rgba(0,0,0,.4)`
                  : `0 10px 22px -12px rgba(0,0,0,.3)`,
                transition: "box-shadow 500ms",
              }}>
                <PosterImg artKey={ex.art} palette={palette} />
              </div>
              <div style={{
                marginTop: 6, fontFamily: '"Fraunces", Georgia, serif',
                fontSize: 11, lineHeight: 1.15, color: palette.ink,
                textAlign: "center", width: 130, marginLeft: -15,
              }}>{ex.title}</div>
              {isSel && (
                <div style={{
                  marginTop: 4, fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase",
                  color: palette.accent, textAlign: "center",
                  width: 130, marginLeft: -15,
                  animation: "fadeIn 500ms ease 150ms both",
                }}>{ex.year} · {ex.medium.split(" · ")[0]}</div>
              )}
            </div>
          );
        })}

        {/* DESCENDANTS — lines radiate from selected exhibit, satellites bloom around */}
        {view.type === "room" && selectedExhibit && (() => {
          const idx = exhibitsForRoom.findIndex(x => x.id === selectedExhibit);
          if (idx < 0) return null;
          const exPos = exhibitPositions[idx];
          const ex = exhibitsForRoom[idx];
          if (!ex.descendants?.length) return null;
          const dPos = descendantLayout(exPos, ex.descendants.length);
          const cx = parseFloat(exPos.left), cy = parseFloat(exPos.top);
          return (
            <React.Fragment>
              <svg style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                pointerEvents: "none", zIndex: 4, overflow: "visible",
              }}>
                {dPos.map((p, i) => (
                  <line key={i}
                        x1={`${cx}%`} y1={`${cy}%`}
                        x2={p.left}  y2={p.top}
                        stroke={palette.accent} strokeWidth="0.7"
                        strokeOpacity="0.55"
                        strokeDasharray="600" strokeDashoffset="600"
                        style={{ animation: `drawIn 1000ms cubic-bezier(.2,.8,.2,1) ${i * 80 + 180}ms forwards` }} />
                ))}
                {/* small dot at the center of the selected exhibit */}
                <circle cx={`${cx}%`} cy={`${cy}%`} r="2.5"
                        fill={palette.accent} opacity="0.8"
                        style={{ animation: "fadeIn 400ms ease 100ms both" }} />
              </svg>
              {ex.descendants.map((d, i) => (
                <DescendantSatellite key={i} d={d} pos={dPos[i]}
                                     palette={palette} delay={i * 80 + 280} />
              ))}
            </React.Fragment>
          );
        })()}
      </div>

      <Recorder on={musicOn} toggle={toggleMusic} palette={palette} />
    </div>
  );
}
"""

artifact = (artifact
    .replace("__SUBWINGS__", SUBWINGS_JS)
    .replace("__ROOMS__", ROOMS_JS)
    .replace("__EXHIBITS__", EXHIBITS_JS)
    .replace("__POSTERS__", POSTERS_JS)
)

out_path = "/sessions/happy-focused-maxwell/mnt/outputs/silver-nitrate-and-silicon.jsx"
pathlib.Path(out_path).write_text(artifact)
print(f"wrote {len(artifact):,} bytes to {out_path}")
print(f"  {len(SUBWINGS)} sub-wings  ·  {len(ROOMS)} rooms  ·  {len(E)} exhibits  ·  {len(POSTERS)} posters")
