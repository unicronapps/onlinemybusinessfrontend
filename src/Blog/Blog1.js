import React from "react";

const BlogPost = () => {
  const metadata = {
    title: "Starting an Online Business in India : Step By Step Guide",
    date: "December 14, 2024",
    author: "Tejas Goel",
    readingTime: "7 minutes",
    tags: ["Online Business", "India", "Startup Guide", "Entrepreneurship"],
  };
  return (
    <div className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Metadata Section */}
        <div className="mb-6 text-gray-500 text-sm">
          <p className="mb-1">
            By{" "}
            <span className="font-medium text-gray-800">{metadata.author}</span>
          </p>
          <p>
            {metadata.date} &#183; {metadata.readingTime}
          </p>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {metadata.title}
        </h1>

        {/* Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {metadata.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-600 text-xs font-medium px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-gray-600 mb-6">
          India is a land of opportunities, and with advanced technologies, it
          has become easier than ever to start an online business. With access
          to government portals and simplified regulations, now is the best time
          to get started.
        </p>
        <div className="mb-8">
          <img
            src={require("./Images/onlinebusiness.jpg")}
            alt="Online Business in India"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              1. Why Do You Want to Start a Business Online?
            </h2>
            <p className="text-gray-600">
              The first question that comes to mind after knowing that you want
              to start a business in India? Is that why you should start a
              business and what business do you want to start?
            </p>
            <p>
              This question explains the overall journey of your business. If
              your answer is probably just to earn the money, then in the long
              term, you're not going to get more from it. Many people I know
              have started their business just for the money knowing “Okay, this
              is the market”. Failed at the end due to a lack of willingness to
              proceed further, so what bites your business to you the answer is
              your passion and your hard work in the starting of this topic. We
              discuss online business as easy nowadays but starting an online
              business is only easy if you have a passion to do this, and you
              can do this day and night without getting tired. The second point
              to start a business in India is that online business requires a
              lower cost the traditional business. If you start with the basic
              expenses, the rent for a small shop in a local city, probably a
              tired-2 city ranging from 15,000 to 20,000. After this, it
              involves setting up the shops like setting up the shells gates
              counter. Add up to around 50,000 to it and if we involve some
              local expenses like cleaning up things and other municipal taxes
              and services, the cost reaches around one lakh. In this case,
              online business seems to be the best solution. You can start your
              business with an Instagram account, no need for a physical shop,
              just a phone number and mail ID. Later on, you can move to a
              website or any platform where you can sell the products. We will
              discuss later how we can do this website setup and other things
              like SEO to get the customers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              2. What Makes Online Business Harder?
            </h2>
            <p className="text-gray-600">
              Every business's core need is the customer and that starts with
              the footfall of people to their business. Whether it's a local
              business or online business, football determines how your business
              is going to be and how people are taking interest in your business
              before starting a business online, one should make a perfect study
              of the product or service they want to offer to their customers
              and know the market before starting it. Unlike the local
              business(shops or malls or offices) where you need to find a
              suitable place to open this online business needs to make a proper
              attempt to get customers to your online platform(Instagram,
              Facebook, or website). Getting customers to your online platform
              isn't too easy task, than just opening a local shop in a
              well-known market. Hair, the business needs to set proper
              strategies to get their customers on their platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              3. How to Start?
            </h2>
            <p className="text-gray-600">
              Knowing that you want to go for an online business in India, need
              to make a proper strategy to do this. As a mention before you need
              passion for your business. So coming to train in 2025, the best
              way to start the business is to start Instagram posting reels.
              Post stories in a particular frequency can result in better reach
              to people showcase your product or services inside the reels, get
              customer testimonials, will help them to get the trust of the
              customers, but the thing to notice, is the quality of the real
              content or the post should be like customer can choose you over
              any other business platform. For example, take a business for
              online artificial jewelry. One should post reels taking a model or
              himself/herself featuring in the real.
            </p>
            <p>
              One thing that attracts the customer is the face of the business.
              People feel more connected and business seems more trustworthy,
              but it's not necessary. Always make with a face are currently
              running without a whey more profitable than others. After you see,
              people are getting to your Instagram page and you have started
              receiving orders. You can go for a professional website, either
              from a developer or self-made from Shopify or WordPress. Tip-never
              spend too much time, creating your own website because you have
              many more things to do other than the website, you start working
              on the website alone, you will end up ignoring other stuff.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              4. Register Your Business
            </h2>
            <p className="text-gray-600">
              While you can start your business without registration, having a
              GST number and registering your business becomes essential as you
              scale. It adds credibility and helps with compliance. More we will
              Discuss in the Next Blog - Starting an Online Business in India
              Part 2
            </p>
          </section>
        </div>

        <div className="mt-10">
          <img
            src={require("./Images/Online Business.webp")}
            alt="Steps to Start"
            className="w-full rounded-lg shadow-lg mb-4"
          />
          <p className="text-gray-500 text-sm">
            Image showcasing the steps to start an online business.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
