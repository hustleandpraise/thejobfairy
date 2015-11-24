var categories = [
    "Academic",
    "Analytics",
    "Assistant",
    "Sales Assistant",
    "SEO",
    "Accountancy",
    "Finance",
    "Architecture",
    "Design",
    "Banking",
    "Insurance",
    "Call Centre",
    "Call-Centre",
    "Customer Service",
    "Chef",
    "Childcare",
    "Construction",
    "Engineering",
    "Drivers",
    "Education",
    "Training",
    "Financial Services",
    "Fitness",
    "Leisure",
    "Franchise",
    "Graduate",
    "Hair",
    "Beauty",
    "Healthcare",
    "Medical",
    "Hotels",
    "HR",
    "Recruitment",
    "IT",
    "Programming",
    "Legal",
    "Managers",
    "Supervisors",
    "Manufacturing",
    "Engineering",
    "Marketing",
    "Market Research",
    "Media",
    "New Media",
    "Miscellaneous",
    "Motors",
    "Multi-lingual",
    "Pharmaceutical",
    "Science",
    "Promotions",
    "Merchandising",
    "Property",
    "Facilities Management",
    "Pub",
    "Bar",
    "Clubs",
    "Restaurants",
    "Catering",
    "Fashion",
    "Retail",
    "Sales",
    "Secretarial",
    "Admin",
    "PA",
    "Security",
    "Senior Appointments",
    "Tech Support",
    "Support",
    "Services",
    "Trades",
    "Operative",
    "Manual",
    "Travel",
    "Tourism",
    "Voluntary",
    "Charity",
    "Warehouse",
    "Logistics",
    "Shipping",
    "Work Experience",
    "Internship",
    "Web Developer"
];


exports.seed = function(knex, Promise) {

    var arr = [knex('categories').del()];

    categories.forEach((category) => {
        arr.push( knex('categories').insert({ title: category, created_at: new Date(), updated_at: new Date() }) );
    });

    return new Promise.all(arr)

};
