const intentMap= {

  // Admission
  "admission.process": ["admission process", "reap", "how to get in", "admission steps", "jee main admission", "addmission process details"],
  "admission.eligibility": ["eligibility", "who can apply", "criteria", "minimum marks", "minimum percentage"],
  "admission.direct admission": ["direct admission", "spot seat", "vacant seats", "management seat"],
  "admission.counselling procedure": ["counselling", "reap counselling", "choice filling", "seat allotment", "registration process"],
  "admission.last year cut off": ["cutoff", "previous cutoff", "last year cut off", "cut off rank"],
  "admission.important dates": ["important dates", "last date", "reap schedule", "application deadline"],
  "admission.documents required": ["required documents", "document list", "certificates needed"],
  "admission.how to apply": ["how to apply", "apply now", "submit form", "fill application"],
  "admission.admission helpline": ["admission contact", "help number", "helpline", "admission phone"],
  "admission.admission-form steps": ["how to fill the admission form", "steps to apply for admission", "form filling process", "admission form procedure", "guide to fill application form", "steps for online admission", " submit the application form"],
  "admission.seat matrix": ["seat matrix", "seat distribution", "how many seats are available", "branch wise seat intake", "total seats in computer engineering", " seats for ai and ds", "seat allocation", "category wise seat breakup", "tfws seats available", "state quota seat distribution", "seats for rajasthan students"],
  "admission.about": ["admission info", "about admission", "admission details", "piet admission", "admission"],

  // Greet
  "greet.about": ["hello", "hi", "hey", "who are you", "greet", "introduce yourself", "piet bot"],

  // Overview
  "overview.established_year": ["established", "foundation year", "when started"],
  "overview.approvals_and_affiliation": ["approvals", "affiliations", "ugc", "rtu", "aicte", "autonomous"],
  "overview.college_ranking": ["ranking", "rank", "top colleges", "piet rank"],
  "overview.why_choose_us": ["why piet", "why join", "benefits of piet", "why choose piet"],
  "overview.about_college": ["about college", "college info", "college overview", "know piet", "tell me about piet"],

  // Hostel Info
  "hostel_info.about": ["hostel", "ac room", "non ac room", "hostel facilities", "hostel details", "hostel information", "hostel amenities"],
  "hostel_info.hostel_fest": ["ojas fest", "hostel fest", "annual hostel event", "hostel celebration", "hostel activities"],

  // Transport
  "transport.personal commute": ["own vehicle", "personal transport", "parking", "car"],
  "transport.about": ["transport", "college bus", "routes", "bus contact", "transport officer"],

  // Fees
  "fees.about": ["fee structure", "tuition fee", "full fee", "fee details"],
  "fees.loan_assistance": ["loan", "loan help", "education loan", "loan facility"],
  "fees.hostel": ["hostel fee", "hostel charges", "hostel cost", "hostel payment"],
  "fees.transport": ["transport fee", "bus charges", "transport cost", "bus payment"],
  "fees.academic": ["academic fee", "semester fee", "yearly fee", "tuition fee"],
  "fees.payment_options": ["payment", "how to pay", "payment method", "online fee", "installments"],
  "fees.any_hidden_charges": ["hidden charges", "extra fee", "unexpected charges"],
  "fees.refund_policy": ["refund", "fee refund", "withdrawal fee", "cancellation policy", "fee return"],

  // Courses
  "courses.btech branches": ["btech branches", "engineering programs", "offered courses", "available streams", "branches", "course offered", "courses offered"],
  "courses.specializations": ["specializations", "cse specializations", "ai", "iot", "data science", "cybersecurity"],
  "courses.new courses": ["new courses", "new programs", "recently added"],
  "courses.ai ml courses": ["ai ml", "machine learning", "ai course", "ml available"],
  "courses.curriculum": ["curriculum", "subjects", "syllabus", "course content"],
  "courses.value added courses": ["value added", "extra courses", "certifications", "skill enhancement"],

  // Courses Offered (Poornima University)
  "courses_not_offered.about": ["courses not offered", "courses unavailable", "not available courses", "piet courses not offered", "piet does not offer"],
  "courses_not_offered.bcom": ["bcom", "commerce course", "bachelor of commerce"],
  "courses_not_offered.bba": ["bba", "management course", "bachelor of business administration"],
  "courses_not_offered.mba": ["mba", "postgrad management", "masters business"],
  "courses_not_offered.mtech": ["mtech", "masters tech", "postgrad engineering"],
  "courses_not_offered.bsc": ["bsc", "science course", "bachelor of science"],
  "courses_not_offered.bca": ["bca", "computer applications", "bachelor of computer applications"],
  "courses_not_offered.btech lateral entry": ["btech lateral entry", "lateral entry engineering", "btech direct second year"],
  "courses_not_offered.btech part time": ["btech part time", "part time engineering", "btech evening classes"],
  "courses_not_offered.btech distance education": ["btech distance education", "distance learning engineering", "btech online"],
  "courses_not_offered.btech online": ["btech online", "online engineering degree", "btech virtual classes"],

  // Facilities
  "facilities.mess food": ["mess", "food", "hostel food", "canteen"],
  "facilities.wifi campus": ["wifi", "internet", "internet access"],
  "facilities.labs and equipment": ["labs", "equipment", "engineering labs", "instruments"],
  "facilities.classrooms": ["classrooms", "teaching rooms", "smart classes"],
  "facilities.library": ["library", "books", "reading room"],
  "facilities.medical facilities": ["medical", "clinic", "doctor", "healthcare"],
  "facilities.canteen": ["canteen", "snacks", "food court"],
  "facilities.gym": ["gym", "fitness", "exercise", "workout"],
  "facilities.differently abled facilities": ["differently abled facilities", "facilities for disabled students", "wheelchair access", " accessible for differently abled", "disabled student support", "ramp and restroom access for disabled", "special facilities for physically challenged students"],
  "facilities.laundry": ["is laundry available in hostel", "laundry facility", "wash clothes", "provide laundry", "laundry services in campus", "washing clothes in hostel", "hostel laundry support", "clothing washing facility"],
  "facilities.guest house": ["is there a guest house", "guest house facility for parents", "can parents stay in college", "guest room for visitors", "guest house booking process", "staying options for guardians", "visitor accommodation in campus", "facilities for visiting parents"],
  "facilities.about": ["facilities", "infrastructure", "hostels", "labs", "campus services"],

  // Campus
  "campus.location": ["location", "address", "where is piet", "campus address"],
  "campus.area": ["campus area", "size", "campus space"],
  "campus.facilities": ["campus facilities", "what's on campus", "amenities"],
  "campus.security": ["security", "safety", "cctv", "guards"],
  "campus.environment": ["environment", "greenery", "pollution free", "eco friendly"],
  "campus.visit": ["campus visit", "can i visit", "visit timing", "tour"],
  "campus.timings": ["college timings", " time does classes start", "when do classes begin", "schedule of college", "college timing in summer and winter", "timings for lectures", "when does college end", "how long is a college day"],
  "campus.about": ["about campus", "campus overview", "infrastructure", "campus details"],

  // Fest & Events
  "annual_fest.about": ["aarohan", "annual fest", "college fest", "main fest", "dj night", "celebrity event", "celebrities", "actor", "actress", "singer", "musician", "performer"],
  "tech_events.about": ["tech fest", "hackathon", "competitions"],
  "freshers_party.about": ["freshers party", "orientation", "pehla kadam", "welcome party"],
  "farewell_party.about": ["farewell", "goodbye party", "last event", "final year send-off"],

  // Student Life
  "student_life.clubs and societies": ["clubs", "societies", "student clubs", "activities"],
  "student_life.technical_events": ["tech events", "technical", "hackathon", "robotics"],
  "student_life.cultural_activities": ["cultural", "dance", "music", "drama", "fashion"],
  "student_life.sports_activities": ["sports", "sports facilities", "games", "football", "cricket", "basketball"],
  "student_life.student_council": ["student council", "committee", "leadership group"],
  "student_life.about": ["student life", "campus life", "engagement", "extracurriculars"],

  // Academics
  "academics.attendance_policy": ["minimum attendance required", "attendance rule", "attendance criteria", "is attendance compulsory", " attendance needed", " check attendance", " view attendance in tcs ion", "can i see my attendance online", "attendance percentage rule", " track attendance"],
  "academics.about": ["academics", "teaching", "learning", "classes", "academics info"],

  // Placements
  "placements.placement_record": ["placement record", "placement rate", "core branch placement"],
  "placements.top_recruiters": ["top recruiters", "companies visiting", "recruiters list"],
  "placements.highest_package": ["highest package", "max salary", "top offer"],
  "placements.average_package": ["average package", "mean salary", "typical ctc"],
  "placements.number_of_offers": ["number of offers", "total jobs", "placement offers"],
  "placements.placement_training": ["placement training", "interview prep", "aptitude training", "mock tests"],
  "placements.internship_support": ["internship", "training", "industrial training", "ppo"],
  "placements.training_modules": ["training modules", "placement support", "resume building", "mock interviews"],
  "placements.placement_cell": ["placement cell", "tpo", "placement office", "placement help"],
  "placements.about": ["placement", "job", "recruitment", "career", "placement summary"],

  // PBIC (Incubation)
  "pbic.purpose": ["pbic purpose", "why pbic", "startup goal"],
  "pbic.services": ["pbic services", "incubation help", "startup support", "funding"],
  "pbic.eligibility": ["pbic eligibility", "who can join pbic", "apply pbic"],
  "pbic.success_stories": ["pbic success", "pbic startups", "achievements"],
  "pbic.contact": ["pbic contact", "pbic email", "incubation contact"],
  "pbic.about": ["pbic", "incubation center", "startup hub", "entrepreneurship support"],

  // Student Support
  "student_support.counseling_services": ["counseling", "mental health", "therapy", "stress help"],
  "student_support.mentorship_programs": ["mentorship", "junior guidance", "peer support"],
  "student_support.career_guidance": ["career help", "career guidance", "resume session", "job advice"],
  "student_support.financial_aid": ["scholarship", "financial help", "fee concession"],
  "student_support.grievance_redressal": ["complaint", "grievance", "raise issue", "student problem"],
  "student_support.anti_ragging": ["ragging", "ragging policy"],
  "student_support.about": ["student support", "student help", "welfare", "guidance services"],

  // Clubs
  "clubs.council_structure": ["student council", "club hierarchy", "club leadership"],
  "clubs.literary": ["literary club", "writing", "debate", "reading"],
  "clubs.aptineus": ["aptitude club", "aptineus", "reasoning"],
  "clubs.udaan_aero_modelling": ["udaan", "aero modeling", "drone club"],
  "clubs.helping_hands": ["helping hands", "social club", "volunteer"],
  "clubs.joshiley_dram_club": ["drama", "acting", "joshiley"],
  "clubs.debug": ["debug", "coding club", "programming"],
  "clubs.perfect_pixels": ["photography", "perfect pixels", "visual club"],
  "clubs.sports_club": ["sports club", "games", "athletics"],
  "clubs.origin_club": ["origin", "eco club", "green club"],
  "clubs.cyborgs": ["robotics", "cyborgs", "automation club"],
  "clubs.aws": ["aws club", "cloud club", "amazon web services"],
  "clubs.ieee": ["ieee", "electronics", "tech club"],
  "clubs.acm": ["acm", "coding society", "computing research"],
  "clubs.graduate_gateway": ["graduate gateway", "study abroad", "gre prep"],
  "clubs.microsoft_learn_student_ambassador": ["microsoft student", "mlsa", "tech leader"],
  "clubs.spic_macay": ["spic macay", "classical music", "cultural"],
  "clubs.vibrant_vision": ["vibrant vision", "art club", "design"],
  "clubs.alumni": ["alumni", "past students", "alumni events", "famous alumni", "pias"],
  "clubs.about": ["clubs", "student clubs", "activities", "societies"],

  // Help & Contact
  "help.helpline": ["admission helpline", "contact number", "phone number"],
  "help.email": ["email", "mail", "support email", "contact mail"],
  "help.website": ["website", "official site", "college site"],
  "help.campus visit": ["campus visit", "visit hours", "visit piet", "tour"],
  "help.student support": ["student support email", "hostel contact", "mess query"],
  "help.placements office": ["placement contact", "tpo email", "placement number"],
  "help.social media": ["instagram", "facebook", "social media", "follow piet"],
  "help.about": ["help", "contact", "support info", "query help"],

  // Leadership
  "leadership.principal": ["principal", "head of college", "dinesh goyal"],
  "leadership.registrar_ombudsperson": ["registrar", "ombudsperson", "dr balwan"],
  "leadership.controller_of_examination": ["controller of exam", "coe", "nitin mukesh"],
  "leadership.governing_council": ["governing council", "council members", "chairperson"],
  "leadership.founder_director": ["founder", "who is the founder", "shashikant singhi", "founder of piet", "founder director"],
  "leadership.co_founder_director": ["co founder", "rahul singhi", "who is co founder", "director rahul singhi", "co-founder of piet"],
  "leadership.management_body": ["management", "management body", "who manages piet", "administration", "college management"],

  //hod

  "hod.applied_science": ["applied science hod name", "hod of department of applied sciences", "applied sciences department head"],
  "hod.ai_ds": ["ai ds department head", "head of artificial intelligence and data science", "hod for ai ds"],
  "hod.computer_engineering": ["computer engineering hod name", "hod of computer department", "head of cs department "],
  "hod.iot": ["iot hod name", "head of internet of things department", "hod of iot department"],


  // Departments
  "departments.applied_sciences": ["applied sciences", "foundation subjects", "maths", "physics"],
  "departments.computer_science": ["cse", "computer science", "cs department"],
  "departments.ai_ds": ["ai ds", "artificial intelligence", "data science dept"],
  "departments.iot": ["iot department", "internet of things", "iot branch"],
  "departments.cybersecurity": ["cybersecurity", "security department", "cyber dept"],

  // Faculty
  "faculty.total_faculty": ["total faculty", "number of faculty", "how many teachers", "faculty strength", "teaching staff count"],
  "faculty.applied_science": ["applied science faculty", "faculty in applied science", "applied science department strength", " teachers in applied science", "science department faculty"],
  "faculty.computer_science": ["computer science faculty", "faculty in computer science", "cse department strength", "cs faculty count", "teachers in cse"],
  "faculty.ai_ds": ["ai faculty", "data science faculty", "faculty in ai ds", "ai ds department strength", "teachers in artificial intelligence"],
  "faculty.iot": ["iot faculty", "faculty in iot", "internet of things department strength", " teachers in iot", "iot department faculty"],


  // Innovation, Research & Entrepreneurship
  "innovation_research.aicte_idea_lab": ["idea lab", "aicte lab", "innovation lab", "3d printer lab"],
  "innovation_research.funding_incubation": ["funding", "incubation", "bootcamp", "research grants"],
  "innovation_research.research_development_cell": ["r&d", "research cell", "publications", "research help"],
  "innovation_research.iic": ["iic", "innovation council", "moe innovation", "iic rating"],
  "innovation_research.ipr": ["ipr", "patents", "copyright", "trademark", "intellectual property"],
  "innovation_research.industry_institute_interaction_practices": ["i3", "industry training", "industry practice"],
  "innovation_research.partners_industry_interaction": ["industry tieups", "collaboration", "industry interaction", "company tieups"],
  "innovation_research.about": ["innovation", "entrepreneurship", "research", "idea lab summary"],

  // Chapters
  "chapters.ISTE_Chapter": ["iste", "iste chapter", "professional values", "technical workshops"],
  "chapters.IEEE_Chapter": ["ieee chapter", "ieee activities", "electronics club"],
  "chapters.ACM_Chapter": ["acm", "acm chapter", "computing society"],
  "chapters.IETE_Chapter": ["iete", "telecom club", "electronics society"],
  "chapters.Poornima_Electoral_Literacy_Forum": ["electoral literacy", "voting awareness", "poornima election club"],

  // Accreditation
  "accreditation.about": ["accreditation", "is piet accredited", "recognized", "college recognition", "approvals"],
  "accreditation.naac": ["naac", "naac grade", "naac accreditation", "naac approved", "naac score"],
  "accreditation.nba": ["nba", "nba accreditation", "nba certified", "nba approval"],
  "accreditation.aicte": ["aicte", "aicte approved", "approved by aicte", "technical education approval"],
  "accreditation.rtu_affiliation": ["rtu", "rtu affiliated", "rtu kota", "rtu college"],
  "accreditation.ugc_2f": ["ugc", "ugc 2f", "ugc recognition", "ugc approval"],
  "accreditation.iso": ["iso", "iso certified", "iso approval", "quality certification"],
  "accreditation.aishe": ["aishe", "aishe certified", "aishe approval"],
  "accreditation.qs_rating": ["qs rating", "qs gauge", "qs approved", "qs diamond"],
  "accreditation.nirf_ranking": ["nirf", "nirf ranking", "nirf rank", "nirf score"],
  "accreditation.rtu_qiv_index": ["qiv", "rtu qiv", "quality index value", "rtu ranking"],
  "accreditation.times_ranking": ["times ranking", "times ranking piet", "ranked in times", "top colleges times"],

  // Alumni
  "alumni": ["alumni", "alumni network", "past students", "piet alumni", "famous alumni", "notable alumni"],

  // Poornima Group
  "poornima_group.about": ["poornima group", "poornima colleges", "pce", "piet", "poornima university", "all poornima campuses"],

  // Dress Code
  "dress_code.about": ["dress code", "uniform", "what to wear", "college dress", "casual dress days", "uniform rules"],

  // TCS iON App
  "tcs_ion_app.about": ["tcs ion", "tcs app", "student app", "attendance app", "tcs ion features", "submit assignments app"]
};
export default intentMap;