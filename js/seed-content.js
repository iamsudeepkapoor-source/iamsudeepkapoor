/* Default page blocks — used by the admin "Import default sections" button.
   Importing seeds the builder with the site's current sections so they can be edited/reordered. */
window.SK_SEED = {
  index: [
    { kind: "hero", data: { eyebrow: "Master Photographer · Mentor · Visual Storyteller", heading: "41+ Years <em>Behind the Lens</em>", lede: "From darkroom chemicals to digital pixels. From controlled studios to underground coal mines. Sudeep Kapoor has spent more than four decades photographing people, industries, personalities, and stories across India.", buttons: [{ label: "Explore the Journey", href: "journey.html", style: "red" }, { label: "Work With Sudeep", href: "services.html" }, { label: "Learn From 41+ Years", href: "mentorship.html" }], meta: ["New Delhi, India", "Studio Chaya Kriti · Est. 1992", "Darkroom → Digital"] } },
    { kind: "stats", data: { items: [{ num: "41+", label: "Years of Experience" }, { num: "1992", label: "Chaya Kriti Founded" }, { num: "200+", label: "Legal Professionals Documented" }, { num: "Pan-India", label: "Assignments Across the Country" }] } },
    { kind: "era_strip", data: { eyebrow: "The Journey", heading: "He did not watch photography evolve. <em>He worked through its evolution.</em>", link_label: "View the Full Timeline", link_href: "journey.html", items: [
      { yr: "The Beginning", nm: "Darkroom", text: "Colour negatives, black & white film, transparencies — craft learned by hand, in the dark." },
      { yr: "Foundation", nm: "Film & Studio", text: "Studio lighting mastery. Every frame cost money — every frame had to count." },
      { yr: "Expansion", nm: "Advertising", text: "Agencies, models, campaigns, personalities — the commercial craft years." },
      { yr: "The Field", nm: "Industrial", text: "Steel plants, factories, mines. 300 feet underground. 300 steps up." },
      { yr: "The Word", nm: "Editorial", text: "Publishing projects and a landmark coffee-table series documenting India's lawyers." },
      { yr: "Adaptation", nm: "Digital", text: "New tools, same eye. The transition many resisted, he absorbed." },
      { yr: "Today", nm: "Mentorship & AI Era", text: "Passing forward four decades of seeing, to photographers finding their way." }
    ] } },
    { kind: "split", data: { bg: "dark", eyebrow: "Signature Story", heading: "Before Drones, <em>He Climbed</em>", image_side: "right", image_cat: "Industrial", image_caption: "Elevated factory view · Film era", paragraphs: [
      "Today, an elevated factory view costs a drone battery. In Sudeep Kapoor's working years, it cost approximately three hundred steps — climbed in full industrial safety gear, camera equipment on his shoulder, up the towers of working plants.",
      "The photographs that came back from those climbs showed manufacturing India from angles almost nobody had seen: not from a helicopter, not from a rendering, but from the highest point a human being was willing to stand."
    ], buttons: [{ label: "Read the Story", href: "journey.html" }] } },
    { kind: "split", data: { bg: "darker", eyebrow: "Signature Story", heading: "300 Feet <em>Below the Earth</em>", image_side: "left", image_cat: "Mining", image_caption: "Underground assignment · ~300 ft", paragraphs: [
      "Most photographers chase light. On one assignment, Sudeep Kapoor descended roughly three hundred feet underground into a working coal mine — into an environment where light itself had to be carried in.",
      "Working within full industrial safety protocols, he photographed the machines and the miners of an India that surface photography never sees."
    ], buttons: [{ label: "Read the Story", href: "journey.html" }] } },
    { kind: "cards", data: { eyebrow: "Commissioned Work", heading: "Photography Services", lede: "Four decades of commercial craft, available for assignment — in studio, on site, and across India.", columns: 3, buttons: [{ label: "View All Services", href: "services.html", style: "solid" }, { label: "Request a Consultation", href: "contact.html" }], items: [
      { idx: "01", title: "Executive & Leadership Portraits", text: "Portraits with presence — for leaders, professionals and personalities who need more than a headshot.", link_label: "Explore", link_href: "services.html#portraits" },
      { idx: "02", title: "Industrial Photography", text: "Plants, factories, heavy industry and engineering environments, photographed by someone who has worked inside them for decades.", link_label: "Explore", link_href: "services.html#industrial" },
      { idx: "03", title: "Editorial & Coffee-Table Books", text: "Long-form visual documentation — from concept to publication — including multi-year book projects.", link_label: "Explore", link_href: "services.html#editorial" }
    ] } },
    { kind: "split", data: { bg: "dark", eyebrow: "Mentorship", heading: "Learn Photography From Someone Who Has <em>Lived Its Evolution</em>", image_side: "right", image_cat: "Mentorship", image_caption: "Studio session · Chaya Kriti", paragraphs: [
      "Not another photography tutorial. A direct learning experience with a photographer who has worked from darkrooms to digital — through film discipline, studio mastery, industrial assignments and editorial publishing.",
      "Portfolio reviews, 1:1 mentorship, studio lighting masterclasses, and a signature program: From Darkroom to Digital."
    ], buttons: [{ label: "Explore Mentorship", href: "mentorship.html", style: "red" }, { label: "Apply for Mentorship", href: "mentorship.html#apply" }] } },
    { kind: "split", data: { bg: "paper", eyebrow: "Editorial Legacy", heading: "The Lawyers of India", image_side: "left", image_cat: "Editorial", image_caption: "Coffee-table book series", paragraphs: [
      "A landmark coffee-table book series documenting distinguished lawyers across India. Volume I — approximately one hundred legal professionals — was published around five years ago. Volume II, covering more than a hundred more, is nearing completion.",
      "It is a project of national documentation: faces, chambers and careers of the people who argue India's law, photographed with the patience of an editorial eye trained over four decades."
    ], buttons: [{ label: "Discuss an Editorial Project", href: "contact.html", style: "solid" }] } },
    { kind: "quote", data: { text: "Film taught a generation of photographers to think before pressing the shutter. That discipline never leaves you — it simply changes cameras.", cite: "The philosophy behind 41+ years of work" } },
    { kind: "system", data: { component: "testimonials", eyebrow: "Kind Words", heading: "What Clients & Students Say" } },
    { kind: "cta", data: { eyebrow: "Begin", heading: "Every Assignment Begins <em>With a Conversation</em>", lede: "Commercial assignment, editorial project, portrait session or mentorship — start by telling Sudeep what you have in mind.", buttons: [{ label: "Discuss a Project", href: "contact.html", style: "red" }, { label: "Apply for Mentorship", href: "mentorship.html#apply" }] } }
  ],

  about: [
    { kind: "page_hero", data: { eyebrow: "About", heading: "A Life Spent <em>Looking</em>", lede: "Sudeep Kapoor has spent more than forty-one years behind the lens — long enough to have developed film by hand, mastered studio light, descended into coal mines, and published books. This is his story." } },
    { kind: "split", data: { eyebrow: "The Beginning", heading: "It Started in the Dark", image_side: "right", image_cat: "Archive", image_caption: "Darkroom years · B&W process", paragraphs: [
      "Before Sudeep Kapoor ever stood behind a camera professionally, he stood in a darkroom. His foundation was built in traditional analogue processes — colour negative processing, black-and-white film development, transparencies — where an image was not taken but made, slowly, in trays of chemistry under a red lamp.",
      "When he moved behind the camera, he carried the darkroom with him: the habit of seeing the finished print before pressing the shutter."
    ] } },
    { kind: "split", data: { bg: "dark", eyebrow: "1992", heading: "Chaya Kriti", image_side: "left", image_cat: "Studio", image_caption: "Chaya Kriti · South Extension II", paragraphs: [
      "In 1992, Sudeep founded his studio, Chaya Kriti, in South Extension Part II, New Delhi. The name became a base for three decades of work: portrait sessions, model photography, advertising shoots, and the controlled-light craft that separates studio photographers from everyone else.",
      "Through a long-standing professional association with Bijan Films, the studio years connected him to production environments, agencies, models, professionals and prominent personalities — including celebrity assignments across advertising and editorial work."
    ] } },
    { kind: "split", data: { eyebrow: "The Field Years", heading: "Photographing the India That Builds India", image_side: "right", image_cat: "Industrial", image_caption: "Heavy industry · On assignment", paragraphs: [
      "Sudeep's industrial portfolio spans heavy industry and manufacturing across India — work connected with environments such as Sonalika Tractors, Monnet, Jindal ancillary industries, steel operations, engineering facilities and mining environments.",
      "He descended approximately 300 feet underground into a working coal mine to photograph mining operations. He climbed approximately 300 steps up industrial towers — in full safety gear — to capture elevated factory views, years before drones made such angles routine."
    ] } },
    { kind: "split", data: { bg: "paper", eyebrow: "Editorial Evolution", heading: "The Lawyers of India", image_side: "left", image_cat: "Editorial", image_caption: "The Lawyers of India · Vol. I & II", paragraphs: [
      "The editorial chapter of Sudeep's career culminates in a major coffee-table book series documenting distinguished lawyers across India — a project of portraiture at national scale.",
      "Volume I, featuring approximately one hundred lawyers, was published around five years ago. Volume II, documenting more than a hundred more, is nearing completion."
    ] } },
    { kind: "quote", data: { bg: "dark", text: "Cameras change. Light does not. Faces do not. If you learn to read light and read people, no technology can make you obsolete.", cite: "Sudeep Kapoor" } },
    { kind: "timeline", data: { eyebrow: "Career Timeline", heading: "Four Decades, In Brief", buttons: [{ label: "Explore the Full Journey", href: "journey.html" }], items: [
      { yr: "The Beginning", title: "Darkroom Apprenticeship", text: "Colour negative processing, black-and-white film, transparencies. Craft learned by hand.", tag: "Analogue Era" },
      { yr: "1992", title: "Chaya Kriti Founded", text: "The studio opens in South Extension Part II, New Delhi. Studio lighting becomes a signature.", tag: "Studio Era" },
      { yr: "Field Years", title: "Industrial Expansion", text: "Steel, manufacturing, engineering and mining environments across India — including the coal mine descent and tower climbs.", tag: "Industrial Era" },
      { yr: "~5 Years Ago", title: "The Lawyers of India, Vol. I", text: "Approximately 100 distinguished lawyers documented and published in a landmark coffee-table book.", tag: "Editorial Era" },
      { yr: "Now", title: "Volume II & Mentorship", text: "More than 100 further lawyers documented — while a new generation of photographers learns from his experience.", tag: "Legacy Era" }
    ] } },
    { kind: "cta", data: { heading: "Current Opportunities", lede: "Sudeep is currently available for commercial assignments, editorial and book projects, executive portraits, mentorship, and speaking engagements.", buttons: [{ label: "Start a Conversation", href: "contact.html", style: "red" }, { label: "Invite Sudeep Kapoor", href: "speaking.html" }] } }
  ],

  journey: [
    { kind: "page_hero", data: { eyebrow: "The Journey", heading: "From Darkroom <em>to Digital</em>", lede: "Photography reinvented itself at least five times in the last forty years. Sudeep Kapoor worked through every reinvention." } },
    { kind: "timeline", data: { bg: "dark", eyebrow: "Milestones", heading: "The Milestones", items: [
      { yr: "The Beginning · Early 1980s", title: "Darkroom Beginnings", text: "A career founded in traditional darkroom workflows: colour negative processing, black-and-white film development, and transparencies.", tag: "Analogue Era" },
      { yr: "1992", title: "Chaya Kriti Founded", text: "Sudeep opens his own studio in South Extension Part II, New Delhi.", tag: "Studio Era" },
      { yr: "Long-standing", title: "Bijan Films Association", text: "A long professional association with Bijan Films connects the studio to production environments, agencies and personalities.", tag: "Studio Era" },
      { yr: "Commercial Years", title: "Advertising & Celebrity Work", text: "Campaign work with agencies and models; assignments photographing prominent personalities.", tag: "Studio Era" },
      { yr: "Field Years", title: "Industrial Expansion", text: "Heavy industry — work connected with Sonalika Tractors, Monnet, Jindal ancillary industries, steel operations and manufacturing across India.", tag: "Industrial Era" },
      { yr: "Field Years", title: "300 Feet Below the Earth", text: "A descent of roughly 300 feet underground into a working coal mine, photographing miners and machines under full safety protocols.", tag: "Industrial Era" },
      { yr: "Field Years", title: "Before Drones, He Climbed", text: "Approximately 300 steps up industrial towers in safety gear, achieving aerial perspectives years before drones made them commonplace.", tag: "Industrial Era" },
      { yr: "The Transition", title: "Digital Transition", text: "The industry's most disruptive shift. Film discipline meets digital freedom.", tag: "Digital Era" },
      { yr: "~5 Years Ago", title: "The Lawyers of India — Volume I", text: "A landmark coffee-table book documenting approximately 100 distinguished lawyers across India is published.", tag: "Editorial Era" },
      { yr: "In Progress", title: "Volume II — Nearing Completion", text: "More than 100 further legal professionals documented.", tag: "Editorial Era" },
      { yr: "Now", title: "The Mentorship Era", text: "Four decades of experience becomes a curriculum: portfolio reviews, 1:1 mentorship, and From Darkroom to Digital.", tag: "Legacy Era" }
    ] } },
    { kind: "quote", data: { text: "Every generation is told photography is about to die. It never dies. It only changes hands — and changes tools.", cite: "41+ years of surviving technological change" } },
    { kind: "cta", data: { heading: "The Journey Continues — <em>Yours Could Start Here</em>", buttons: [{ label: "Learn From This Journey", href: "mentorship.html", style: "red" }, { label: "See the Work", href: "portfolio.html" }] } }
  ],

  services: [
    { kind: "page_hero", data: { eyebrow: "Services", heading: "Commissioned <em>Photography</em>", lede: "Four decades of commercial craft, available for assignment. In studio at Chaya Kriti, on location in Delhi, or anywhere in India your project requires.", buttons: [{ label: "Request a Photography Consultation", href: "contact.html", style: "red" }] } },
    { kind: "cards", data: { eyebrow: "People", heading: "Portrait & People Photography", columns: 3, items: [
      { idx: "01", title: "Portrait Photography", text: "Individual portraits with character — built on four decades of reading faces, directing subjects, and shaping light.", link_label: "Enquire", link_href: "contact.html" },
      { idx: "02", title: "Executive & Leadership Portraits", text: "Portraits for boards, chambers, firms and leadership pages — the discipline behind the Lawyers of India series, applied to your organisation.", link_label: "Enquire", link_href: "contact.html" },
      { idx: "03", title: "Celebrity & Personality Photography", text: "Experienced with prominent personalities and production environments — discreet, fast, comfortable with teams.", link_label: "Enquire", link_href: "contact.html" },
      { idx: "04", title: "Studio Photography", text: "Controlled-light sessions at Chaya Kriti, New Delhi — portraits, products and model portfolios.", link_label: "Enquire", link_href: "contact.html" }
    ] } },
    { kind: "cards", data: { bg: "dark", eyebrow: "Industry", heading: "Industrial & Corporate Photography", lede: "Steel plants, manufacturing floors, engineering facilities and mines — including 300 feet underground.", columns: 3, items: [
      { idx: "05", title: "Industrial Photography", text: "Plants, machinery, processes and people at work — for annual reports, corporate communications and heritage records.", link_label: "Enquire", link_href: "contact.html" },
      { idx: "06", title: "Corporate Photography", text: "Offices, teams, facilities, events and leadership — a coherent visual record of your organisation.", link_label: "Enquire", link_href: "contact.html" },
      { idx: "07", title: "Pan-India Assignments", text: "Multi-site and multi-city projects across India, managed by a photographer with decades of travelling-assignment experience.", link_label: "Enquire", link_href: "contact.html" },
      { idx: "08", title: "Institutional Documentation", text: "Schools, institutions, chambers and organisations documented for record and archives.", link_label: "Enquire", link_href: "contact.html" }
    ] } },
    { kind: "cards", data: { eyebrow: "Publishing", heading: "Editorial, Advertising & Books", columns: 3, items: [
      { idx: "09", title: "Editorial Photography", text: "Photography for publications and long-form projects — narrative sequences, profiles and reportage.", link_label: "Enquire", link_href: "contact.html" },
      { idx: "10", title: "Advertising Photography", text: "Campaign and commercial imagery, art-directed and deadline-driven — experience with agencies since the film era.", link_label: "Enquire", link_href: "contact.html" },
      { idx: "11", title: "Coffee-Table Book Photography", text: "End-to-end visual authorship of book projects — proven by the Lawyers of India series.", link_label: "Enquire", link_href: "contact.html" },
      { idx: "12", title: "Visual Legacy Projects", text: "Documenting a family, firm, institution or industry for posterity — photography made to be looked at in fifty years.", link_label: "Enquire", link_href: "contact.html" }
    ] } },
    { kind: "numlist", data: { bg: "paper", eyebrow: "How It Works", heading: "The Process", paragraphs: ["Every assignment is different, but the shape of a project is consistent — and it always begins with a conversation."], items: [
      { title: "Consultation", text: "You describe the project — purpose, audience, locations, timelines. Sudeep advises on approach." },
      { title: "Proposal", text: "Scope, deliverables, schedule and commercial terms, in writing." },
      { title: "The Shoot", text: "In studio or on site — planned, safe, and efficient with your people's time." },
      { title: "Selection & Delivery", text: "Edited selects delivered to agreed formats — print, publication or digital use." }
    ] } },
    { kind: "faq", data: { eyebrow: "Questions", heading: "Frequently Asked", items: [
      { q: "Does Sudeep travel for assignments?", a: "Yes. Pan-India assignments have been part of his practice for decades — multi-city corporate projects, industrial sites, and editorial travel are all familiar territory." },
      { q: "Can he work inside industrial and safety-controlled environments?", a: "Yes. His industrial portfolio includes steel operations, manufacturing plants, engineering facilities and mining environments — including underground work — under full industrial safety protocols." },
      { q: "How is pricing structured?", a: "Pricing depends on scope: duration, locations, usage rights and deliverables. Every project receives a written proposal after the initial consultation." },
      { q: "Does he take on long-term book or documentation projects?", a: "Yes — the Lawyers of India series is exactly such a project. Multi-year documentation, institutional legacy work and coffee-table books are a core specialisation." }
    ] } },
    { kind: "cta", data: { heading: "Tell Sudeep About <em>Your Project</em>", lede: "A short description is enough to begin. You will receive a considered reply, not an automated one.", buttons: [{ label: "Request a Photography Consultation", href: "contact.html", style: "red" }] } }
  ],

  mentorship: [
    { kind: "page_hero", data: { eyebrow: "Mentorship", heading: "Learn From 41+ Years <em>Behind the Lens</em>", lede: "Not another photography tutorial. A direct learning experience with a photographer who has worked from darkrooms to digital — and is still working.", buttons: [{ label: "Apply for Mentorship", href: "#apply", style: "red" }] } },
    { kind: "split", data: { eyebrow: "Why This Exists", heading: "The Internet Teaches Settings. <em>Experience Teaches Seeing.</em>", image_side: "right", image_cat: "Mentorship", image_caption: "Teaching session · Chaya Kriti", paragraphs: [
      "There has never been more photography education available — and never more confusion. Tutorials teach what buttons do. They cannot teach how to read a face, how to shape light on it, or how to survive four decades of technological change.",
      "Sudeep Kapoor's mentorship exists to pass on the part of photography that does not fit in a tutorial: judgement, discipline, and the working habits of a career that began in the darkroom and never stopped adapting."
    ] } },
    { kind: "cards", data: { bg: "dark", eyebrow: "Who It's For", heading: "Who Should Join", columns: 3, items: [
      { title: "Beginners", text: "Who want a real foundation — exposure thinking, light, and composition — instead of gear anxiety." },
      { title: "Working Photographers", text: "Who want honest critique, stronger portfolios, and the professional discipline that sustains a long career." },
      { title: "Career Switchers & Students", text: "Who need direction from someone who has actually built and rebuilt a photography career." }
    ] } },
    { kind: "cards", data: { bg: "paper", eyebrow: "Programs", heading: "Mentorship Programs", lede: "Every program is taught personally by Sudeep. Seats are limited by design.", columns: 2, items: [
      { idx: "Session · 60 minutes", title: "Portfolio Review Session", text: "A focused one-to-one critique of your portfolio: composition, lighting, sequencing, and where your work stands.", tags: ["1:1", "Online or In-Studio"], link_label: "Apply", link_href: "#apply" },
      { idx: "Multi-session", title: "1:1 Photography Mentorship", text: "A personalised curriculum built around your level and goals: portfolio development, lighting guidance and career direction.", tags: ["1:1", "Limited Seats"], link_label: "Apply", link_href: "#apply" },
      { idx: "Masterclass", title: "Studio Lighting Masterclass", text: "Light direction, quality, modifiers, portrait lighting and face shaping — studio craft dating to 1992.", tags: ["Small Group or 1:1"], link_label: "Apply", link_href: "#apply" },
      { idx: "Mentorship Track", title: "Portrait Photography Mentorship", text: "Reading faces. Subject comfort. Expression and character — the skills behind 200+ published portraits.", tags: ["1:1", "Multi-Session"], link_label: "Apply", link_href: "#apply" },
      { idx: "Signature Program", title: "From Darkroom to Digital", text: "The evolution of photography taught by someone who lived it: film discipline, exposure thinking, and timeless principles.", tags: ["Signature", "Cohort or 1:1"], link_label: "Apply", link_href: "#apply" },
      { idx: "Career Track", title: "Photography Career Mentorship", text: "Professional discipline, clients, pricing mindset, and longevity — from someone in his fifth decade.", tags: ["Working Photographers"], link_label: "Apply", link_href: "#apply" }
    ] } },
    { kind: "quote", data: { text: "I will not teach you to photograph like me. I will teach you to see like yourself — with the discipline of someone trained on film.", cite: "Sudeep Kapoor" } },
    { kind: "system", data: { component: "mentorship_form", eyebrow: "Application", heading: "Apply for Mentorship", lede: "Three short steps. All information stays private." } },
    { kind: "cta", data: { heading: "Forty-One Years of Lessons. <em>One Student at a Time.</em>", buttons: [{ label: "Read the Journal First", href: "journal.html" }] } }
  ],

  speaking: [
    { kind: "page_hero", data: { eyebrow: "Speaking & Institutions", heading: "Four Decades of Stories, <em>Told in Person</em>", lede: "Sudeep Kapoor speaks at photography schools, universities, art institutions, corporate creative sessions, panels and podcasts.", buttons: [{ label: "Invite Sudeep Kapoor", href: "contact.html", style: "red" }] } },
    { kind: "cards", data: { eyebrow: "Formats", heading: "Engagement Formats", columns: 3, items: [
      { title: "Guest Lectures", text: "For photography schools, universities, art schools and creative institutes — career talks and craft sessions with real archive material." },
      { title: "Masterclasses & Workshops", text: "Hands-on studio lighting and portrait workshops for institutions and photography clubs." },
      { title: "Panels, Podcasts & Media", text: "Conversations on photography's evolution, craft, and creative longevity." }
    ] } },
    { kind: "numlist", data: { bg: "dark", eyebrow: "Talks", heading: "Signature Topics", items: [
      { title: "41 Years Behind the Lens", text: "A career retrospective — what four decades in Indian photography actually looked like from the inside." },
      { title: "From Darkroom to Digital", text: "Surviving every technology that was supposed to end photography — and what carries over." },
      { title: "What Film Photography Taught Us", text: "Exposure thinking, discipline and decision-making from the era when every frame cost money." },
      { title: "The Art of Reading Faces", text: "Portraiture beyond technique — subject comfort, expression and character." },
      { title: "Studio Lighting Beyond Equipment", text: "Direction and quality of light, taught without a single gear recommendation." },
      { title: "Photographing Industry", text: "Steel plants, factory towers and a coal mine 300 feet down." },
      { title: "Surviving Technological Change", text: "A working framework for creative professionals facing disruption — including the AI era." },
      { title: "Building a 40-Year Creative Career", text: "Professional discipline, client relationships and longevity." }
    ] } },
    { kind: "cta", data: { heading: "Bring 41 Years of Photography <em>Into Your Institution</em>", buttons: [{ label: "Invite Sudeep Kapoor", href: "contact.html", style: "red" }] } }
  ],

  contact: [
    { kind: "page_hero", data: { eyebrow: "Contact", heading: "Every Assignment Begins <em>With a Conversation</em>", lede: "Tell Sudeep what you have in mind. Choose an enquiry type below — the form adapts to ask only what's relevant." } },
    { kind: "system", data: { component: "contact_form", eyebrow: "Contact", heading: "Enquiry Form" } },
    { kind: "richtext", data: { bg: "paper", eyebrow: "The Studio", heading: "Chaya Kriti", paragraphs: ["South Extension Part II, New Delhi, India. Established 1992.", "Studio sessions by appointment; assignments undertaken across Delhi NCR and pan-India."] } }
  ],

  journal: [
    { kind: "page_hero", data: { eyebrow: "The Journal", heading: "Notes From Four <em>Decades</em>", lede: "Photography lessons, darkroom stories, lighting notes and career wisdom — written from experience, not from a syllabus." } },
    { kind: "system", data: { component: "journal_list" } },
    { kind: "cta", data: { heading: "Prefer These Lessons <em>In Person?</em>", lede: "The Journal is the free tier of four decades of experience. Mentorship is the direct line.", buttons: [{ label: "Explore Mentorship", href: "mentorship.html", style: "red" }, { label: "Book a Lecture", href: "speaking.html" }] } }
  ],

  portfolio: [
    { kind: "page_hero", data: { eyebrow: "Portfolio", heading: "Selected <em>Work</em>", lede: "Portraits, industry, editorial, studio and advertising — a working portfolio drawn from four decades. Click any frame to view it larger." } },
    { kind: "system", data: { component: "portfolio_grid" } },
    { kind: "cta", data: { heading: "Want Work Like This <em>For Your Project?</em>", buttons: [{ label: "Discuss a Project", href: "contact.html", style: "red" }, { label: "Explore the Archive", href: "archive.html" }] } }
  ]
};

/* Default form fields — used by the admin "Import default fields" button. */
window.SK_SEED_FORMS = {
  contact: [
    { field_key: "name", label: "Full Name", type: "text", required: true, step: 1 },
    { field_key: "email", label: "Email", type: "email", required: true, step: 1 },
    { field_key: "phone", label: "Phone", type: "tel", step: 1 },
    { field_key: "organisation", label: "Organisation", type: "text", step: 1 },
    { field_key: "enquiry_type", label: "Enquiry Type", type: "select", required: true, width: "full", step: 1, options: ["Photography Assignment", "Industrial Photography", "Corporate Photography", "Editorial Project", "Coffee-Table Book", "Advertising Assignment", "Portrait Session", "Mentorship", "Masterclass", "Speaking Invitation", "Institutional Collaboration", "Media Interview", "Other"] },
    { field_key: "location", label: "Project Location(s)", type: "text", placeholder: "e.g. Delhi NCR, multi-city, pan-India", step: 1, show_if: { field: "enquiry_type", values: ["Photography Assignment", "Industrial Photography", "Corporate Photography", "Editorial Project", "Coffee-Table Book", "Advertising Assignment"] } },
    { field_key: "timeline", label: "Timeline", type: "select", step: 1, options: ["Urgent (within 2 weeks)", "Within a month", "1–3 months", "Flexible / exploratory"], show_if: { field: "enquiry_type", values: ["Photography Assignment", "Industrial Photography", "Corporate Photography", "Editorial Project", "Coffee-Table Book", "Advertising Assignment", "Portrait Session"] } },
    { field_key: "institution_type", label: "Institution / Organisation Type", type: "select", step: 1, options: ["Photography school", "University / art school", "Corporate", "Photography club", "Podcast / media", "Other"], show_if: { field: "enquiry_type", values: ["Speaking Invitation", "Institutional Collaboration", "Masterclass"] } },
    { field_key: "message", label: "Your Message", type: "textarea", required: true, width: "full", step: 1, placeholder: "Describe the project, engagement or question." },
    { field_key: "consent", label: "I consent to being contacted about this enquiry.", type: "checkbox", required: true, step: 1 }
  ],
  mentorship: [
    { field_key: "name", label: "Full Name", type: "text", required: true, step: 1 },
    { field_key: "email", label: "Email", type: "email", required: true, step: 1 },
    { field_key: "phone", label: "Phone", type: "tel", step: 1 },
    { field_key: "city", label: "City", type: "text", required: true, step: 1 },
    { field_key: "country", label: "Country", type: "text", step: 1 },
    { field_key: "age_range", label: "Age Range", type: "select", step: 1, options: ["Under 18", "18–24", "25–34", "35–44", "45+"] },
    { field_key: "level", label: "Current Level", type: "select", required: true, step: 2, options: ["Beginner", "Intermediate", "Advanced / Working Photographer", "Professional"] },
    { field_key: "years_experience", label: "Years of Experience", type: "select", step: 2, options: ["0–1", "2–5", "6–10", "10+"] },
    { field_key: "camera", label: "Camera System", type: "text", step: 2, placeholder: "e.g. Canon, Nikon, Sony, Phone" },
    { field_key: "interest", label: "Primary Interest", type: "select", required: true, step: 2, options: ["Portraits", "Studio Lighting", "Industrial / Corporate", "Editorial / Documentary", "Career Development", "General Craft"] },
    { field_key: "portfolio_url", label: "Portfolio URL (or Instagram)", type: "url", width: "full", step: 2, placeholder: "https://" },
    { field_key: "program", label: "Preferred Program", type: "select", required: true, width: "full", step: 3, options: ["Portfolio Review Session", "1:1 Photography Mentorship", "Studio Lighting Masterclass", "Portrait Photography Mentorship", "From Darkroom to Digital", "Photography Career Mentorship", "Not sure — advise me"] },
    { field_key: "goals", label: "Your Goals", type: "textarea", required: true, width: "full", step: 3, placeholder: "What do you want from this mentorship?" },
    { field_key: "challenge", label: "Your Biggest Challenge Right Now", type: "textarea", width: "full", step: 3 },
    { field_key: "why_sudeep", label: "Why Sudeep Kapoor?", type: "textarea", width: "full", step: 3 },
    { field_key: "consent", label: "I consent to being contacted about this application.", type: "checkbox", required: true, step: 3 }
  ]
};

/* Existing journal articles — seeded into the CMS so they are editable. */
window.SK_SEED_JOURNAL = [
  { title: "What the Darkroom Teaches That YouTube Cannot", category: "Darkroom Stories", read_time: "6 min read", excerpt: "On patience, chemistry, and why waiting for an image to appear changes how you take one.", body: "Before I photographed anything worth keeping, I spent my time in the dark — literally. Colour negative processing, black-and-white development, transparencies. In a darkroom, an image is not taken; it is made, slowly, in trays of chemistry, under a red lamp, by someone who cannot afford to be careless.\n\nThe darkroom teaches three things no tutorial can. First, consequence: on film, every exposure decision is final. You learn to think before the shutter, not after. Second, patience: an image that takes twenty minutes to appear teaches you that photography rewards waiting. Third, humility: the chemistry does not care about your opinion of yourself. It only responds to precision.\n\nWhen digital arrived, many of my generation mourned. I did not. I noticed something better: the discipline the darkroom beat into us became a superpower on digital cameras. When you have spent years making every frame count, an unlimited memory card does not make you sloppy — it makes you fast and precise.\n\nYou do not need a darkroom to learn this. But you do need its lesson: slow down before the shutter, so you can be confident after it." },
  { title: "Light Direction Before Light Equipment", category: "Studio Lighting", read_time: "5 min read", excerpt: "Most lighting problems are not solved by buying a modifier. They are solved by moving one foot to the left.", body: "Every week a photographer asks me which softbox to buy. Almost never does anyone ask me where to put it. That is the industry's problem in one sentence: we have confused owning light with understanding it.\n\nSince founding Chaya Kriti in 1992, I have shaped thousands of faces with light. The variables that matter have never changed: direction, quality, and distance. Direction decides what a face says. Quality — hard or soft — decides how it says it. Distance decides how quickly the light falls away into shadow.\n\nHere is an exercise I give lighting students. Take one lamp — any lamp. Sit a subject in a dark room. Now move the lamp: high, low, left, right, behind. Watch what happens to the cheekbones, to the eyes, to the mood. Do this for an hour and you will learn more than a month of equipment reviews can teach.\n\nEquipment amplifies understanding. It cannot replace it." },
  { title: "Surviving Every Technology That Was Going to Kill Photography", category: "Career Lessons", read_time: "7 min read", excerpt: "Digital was going to end craft. Phones were going to end professionals. AI is next. Notes from someone who outlasted all of it so far.", body: "In my forty-one years behind the lens, photography has been declared dead at least four times. Digital would kill craft. Stock libraries would kill assignments. Camera phones would kill professionals. Now artificial intelligence will kill everything, apparently.\n\nEach obituary was written by people who confused photography with its tools. Photography was never the camera. It is the judgement of what deserves a frame, the ability to earn a stranger's trust in minutes, the willingness to climb three hundred steps or descend three hundred feet because that is where the picture is.\n\nEvery disruption follows the same pattern. The tool becomes cheaper, so the floor drops — anyone can produce an acceptable image. But the ceiling rises too, because clients drowning in acceptable images pay more for exceptional ones. The photographers who die in each transition are the ones whose only advantage was owning the tool.\n\nMy advice to photographers frightened of AI is the same advice the darkroom generation needed in 1999: invest in the parts of the craft that transfer. Light. Faces. Trust. Story. Reliability. The tools will keep changing. Your eye is the only equipment you keep for forty years." },
  { title: "Reading Faces: What 200+ Portrait Sittings Taught Me", category: "Portraiture", read_time: "6 min read", excerpt: "Lessons from photographing more than two hundred of India's lawyers — one guarded profession, one portrait at a time.", body: "Lawyers are professionally trained not to reveal themselves. Photographing more than two hundred of them for a coffee-table series was therefore the finest portrait education of my career — a masterclass in the difference between a likeness and a portrait.\n\nA likeness records a face. A portrait records a person deciding to be seen. That decision cannot be demanded; it must be earned, usually in the first ten minutes, usually before the camera comes up. I learned to arrive early, to ask about the case files on the desk, to let a subject finish being important before inviting them to be human.\n\nTechnique matters — light shapes character, and a lens choice is a psychological choice. But the sitting is won or lost in conversation. The camera only photographs whatever trust you have built by the time you raise it." },
  { title: "Three Hundred Feet Down: Photographing Where There Is No Light", category: "Field Notes", read_time: "8 min read", excerpt: "Notes from a coal mine assignment — the working conditions, the miners, and the photograph that had to be earned.", body: "Photographers talk endlessly about chasing light. On one assignment, I went to a place that has none: roughly three hundred feet underground, inside a working coal mine, where every photon must be carried in with you.\n\nThe preparation was industrial, not photographic — safety briefings, protective equipment, protocols that exist because the environment does not forgive mistakes. Only after all of that comes the photographer's problem: how do you make an honest image of darkness, dust and machines, with the light you can carry?\n\nWhat I remember most is not the difficulty. It is the miners — men doing hard, skilled, invisible work, photographed almost never. Surface photography never sees this India. That, more than the technical challenge, is why the assignment mattered: some photographs exist to be beautiful, and some exist so that a thing is not unwitnessed.\n\nThe same is true of the factory towers I climbed — roughly three hundred steps, camera on shoulder, before drones existed. The lesson of the field years is simple: the picture is where the picture is. Your job is to go there." },
  { title: "The Pricing Mindset: What Film Taught Me About Value", category: "Career Lessons", read_time: "5 min read", excerpt: "Every frame used to cost money. That constraint taught a generation how to think about worth — theirs included.", body: "On film, every press of the shutter cost real money — film stock, processing, printing. That constraint taught us something today's photographers must learn deliberately: everything in photography has a cost, and therefore everything has a value. Including you.\n\nYoung photographers price their time. Veterans price their judgement. A client is not paying for your hours on site; they are paying for the forty-one years that let you solve in one frame what would take someone else forty. When you understand that, pricing conversations stop being embarrassing and start being honest.\n\nThree habits sustain a long career: deliver what you promised, when you promised it; charge enough to do the work properly; and never let a cheap assignment teach you cheap habits. The photographers still working in their fifth decade are not always the most talented. They are the most trusted." }
];

/* Existing portfolio placeholders — seeded so the grid is editable (swap in real images later). */
window.SK_SEED_PORTFOLIO = [
  { title: "Executive Portrait Study", category: "portrait", era: "digital", ratio: "r-34", caption: "New Delhi" },
  { title: "Factory Tower View", category: "industrial", era: "film", ratio: "r-43", caption: "Elevated view · ~300 steps up" },
  { title: "The Lawyers of India — Sitting", category: "editorial", era: "digital", ratio: "r-34", caption: "Book series" },
  { title: "Coal Mine, ~300 ft Underground", category: "industrial", era: "film", ratio: "r-32", caption: "Mining environment" },
  { title: "Studio Lighting Study", category: "studio", era: "film", ratio: "r-34", caption: "Chaya Kriti" },
  { title: "Campaign Frame", category: "advertising", era: "film", ratio: "r-43", caption: "Agency assignment" },
  { title: "Portrait on Film", category: "portrait", era: "film", ratio: "r-34", caption: "B&W film" },
  { title: "Steel Operations", category: "industrial", era: "digital", ratio: "r-32", caption: "Heavy industry" },
  { title: "Archival Scan — Transparency", category: "legacy", era: "film", ratio: "r-43", caption: "Scanned transparency" },
  { title: "Model Portfolio Session", category: "studio", era: "digital", ratio: "r-34", caption: "Controlled light" },
  { title: "Chambers & Character", category: "editorial", era: "digital", ratio: "r-32", caption: "Environmental portrait" },
  { title: "Darkroom Print, Restored", category: "legacy", era: "film", ratio: "r-34", caption: "Silver gelatin" }
];
