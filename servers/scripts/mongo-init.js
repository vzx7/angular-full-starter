db.createUser(
    {
        user: "root",
        pwd: "Qwsderf56",
        roles: [
            {
                role: "readWrite",
                db: "full"
            }
        ]
    }
);