const Subject = require('../models/Subject');

exports.createSubject = async (req, res) => {
    try {
        const { title, description, icon, experimentsCount, slug, subject_id } = req.body;

        const newSubject = new Subject({
            title,
            description,
            icon,
            experimentsCount,
            slug,
            subject_id
        });

        await newSubject.save();
        res.status(201).json({ message: "Subject created successfully", subject: newSubject });
    } catch (err) {
        console.error("[SUBJECT] Create Error:", err);
        res.status(500).json({ message: "Server error while creating subject" });
    }
};

exports.getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().sort({ createdAt: -1 });
        res.status(200).json(subjects);
    } catch (err) {
        console.error("[SUBJECT] Get All Error:", err);
        res.status(500).json({ message: "Server error while fetching subjects" });
    }
};

exports.seedSubjects = async (req, res) => {
    try {
        const defaultSubjects = [
            {
                title: "Data Structures and Algorithms",
                description: "Master arrays, linked lists, trees, and core algorithms with interactive execution.",
                icon: "dsa",
                experimentsCount: 0,
                subject_id: "BCS-301"
            },
            {
                title: "Computer Networks",
                description: "Explore the architecture of the internet, networking protocols, and OSI models.",
                icon: "cn",
                experimentsCount: 0,
                slug: "cn",
                subject_id: "BCS-502"
            },
            {
                title: "Digital Logic & Design",
                description: "Master the fundamentals of digital electronics, logic gates, and circuit design.",
                icon: "dld",
                experimentsCount: 0,
                slug: "dld",
                subject_id: "BCS-303"
            },
            {
                title: "Database Management",
                description: "Learn to design, query, and manage relational databases using SQL.",
                icon: "dbms",
                experimentsCount: 0,
                slug: "dbms",
                subject_id: "BCS-404"
            },
            {
                title: "Object Oriented Programming",
                description: "Learn the principles of encapsulation, inheritance, polymorphism, and abstraction.",
                icon: "oops",
                experimentsCount: 0,
                slug: "oops",
                subject_id: "BCS-405"
            },
            {
                title: "Microprocessor and Microcontroller",
                description: "Study the architecture, programming, and interfacing of 8085/8086 microprocessors.",
                icon: "mpmc",
                experimentsCount: 0,
                slug: "mpmc",
                subject_id: "BCS-506"
            },
            {
                title: "C Programming Lab",
                description: "Master the foundations of C programming, memory management, and data types.",
                icon: "c",
                experimentsCount: 0,
                subject_id: "BCS-107"
            },
            {
                title: "Design and Analysis of Algorithms",
                description: "Design and Analysis of Algorithms Virtual Lab",
                icon: "FlaskConical",
                experimentsCount: 0,
                slug: "daa",
                subject_id: "BCS-408"
            }
        ];

        // Clear existing to avoid duplicates if re-seeding
        await Subject.deleteMany({});
        await Subject.insertMany(defaultSubjects);

        res.status(201).json({ message: "Default subjects seeded successfully" });
    } catch (err) {
        console.error("[SUBJECT] Seed Error:", err);
        res.status(500).json({ message: "Server error while seeding subjects" });
    }
};
