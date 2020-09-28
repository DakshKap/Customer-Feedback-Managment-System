const userModel=require("../model/userModel");
const feedbackModel=require("../model/feedbackModel");

//Function to check if the user is authenticated
const reqAuth= function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        res.redirect('/');
    }
    else
    {
        next();
    }
}


//Insert user into db (Signup form)
const insertUser= function (req, res)
{
    //Add user to DB
    const feed={};

    //Retrieve data from form body
    const newUser= new userModel(req.body);
    newUser.save(function (err)
    {
        if(err)
        {
            feed.msg=err.message;
        }else
        {
            feed.msg= "User added successfully"
            console.log(req.body.email +" added to database");
        }
        res.render('signup', {data:feed});
    });

};

//Insert feedback into db (feedback form)
const insertFeedback = function (req, res)
{
    const feed={};
    const newFeedback = new feedbackModel(req.body);
    newFeedback.save(function (err)
    {
        if(err)
        {
            feed.msg=err.message;
            console.log(err);
        }else
        {
            feed.msg= "Feedback submitted successfully";
            console.log("feedback added to database");
            feed.msg="feedback";
            feed.rel="Thank you for your feedback. Our customer service team will be in touch with you shortly."
            res.render("feedback",
            {
                firstname: req.session.user.firstname,
                lastname: req.session.user.lastname,
                email: req.session.user.email,
                data: feed
            });
        }

    })
}

//Search DB for user for authentication
const auth= function(req, res)
{
    console.log("auth");
    //Autheticate user through db search
    const email= req.body.email;
    const password= req.body.password;

    userModel.findOne({email: email, password: password}, function(err, user)
    {
        console.log(email);
        console.log(password)
        const feed={};
        //If error found
        if (err)
        {
            console.log(err);
            feed.msg=err.message;
        }
        //If no user found
        if (!user)
        {
            console.log("User not found");
            feed.msg="No user found";
        }
        else //If user found
        {
            //Set user to current session user
            req.session.user= user;

            //Login via passport
            req.login(email, function (err)
            {
                if(email== "admin@admin.com")
                {
                    console.log("Admin, forwarding to admin console");
                    // res.redirect("adminConsole");
                }
                /*else if (user.role="CSR")
                {
                    res.redirect("csrConsole");
                }*/
                else
                {
                    console.log("Customer found, forwarding to feedback page");
                    res.redirect("feedback");
                }
            });
        }
    });
};

//Logout
const logout= function (req, res)
{
    req.logOut();
    res.redirect('/');
}

module.exports= {"insertUser": insertUser, "auth": auth, "reqAuth": reqAuth, "logout": logout, "insertFeedback": insertFeedback};