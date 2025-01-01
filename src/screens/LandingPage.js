import {
  FaSearch,
  FaUserCircle,
  FaChartLine,
  FaCogs,
  FaMobileAlt,
  FaThumbsUp,
} from "react-icons/fa";
import Header from "../components/Header";

function LandingPage() {
  const testimonials = [
    {
      id: 1,
      name: "Jane Doe",
      feedback: "onlineMyBusiness helped me reach new customers effortlessly!",
    },
    {
      id: 2,
      name: "John Smith",
      feedback:
        "My business visibility improved tremendously after going digital.",
    },
    {
      id: 3,
      name: "Emily Johnson",
      feedback:
        "A fantastic tool for modern businesses to establish an online presence!",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value;
    const location = e.target.location.value;
    console.log(`Searching for ${keyword} in ${location}`);
    // Add routing or Firebase query as needed
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center my-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Your Digital Business Card
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Transform your business into an online presence with ease.
          </p>
          <div className="flex justify-center items-center mb-8">
            <span className="text-3xl font-bold text-indigo-600 mr-2">
              500+
            </span>
            <span className="text-lg text-gray-700">businesses served</span>
          </div>
        </section>

        {/* Search Bar */}
        <section className="flex flex-col items-center">
          <form
            onSubmit={handleSearch}
            className="w-full max-w-md flex flex-col sm:flex-row items-center mb-8"
          >
            <input
              name="keyword"
              type="text"
              placeholder="Keyword"
              className="flex-grow border rounded-l px-4 py-2 text-gray-700 focus:outline-none"
            />
            <input
              name="location"
              type="text"
              placeholder="Location"
              className="flex-grow border rounded-r sm:rounded-none sm:rounded-r px-4 py-2 text-gray-700 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 mt-4 sm:mt-0 rounded hover:bg-indigo-500 flex items-center"
            >
              <FaSearch className="mr-2" /> Search
            </button>
          </form>
        </section>

        {/* Services Section */}
        <section id="services" className="text-center mb-10">
          <h3 className="text-2xl font-semibold mb-4">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md p-6 rounded-lg">
              <FaCogs className="text-3xl text-indigo-600 mx-auto mb-2" />
              <h4 className="font-semibold text-lg">Digital Business Card</h4>
              <p className="text-gray-600">
                Create a digital business card to enhance your online presence.
              </p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <FaChartLine className="text-3xl text-indigo-600 mx-auto mb-2" />
              <h4 className="font-semibold text-lg">SEO Optimization</h4>
              <p className="text-gray-600">
                Improve your visibility on search engines to reach more
                customers.
              </p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <FaMobileAlt className="text-3xl text-indigo-600 mx-auto mb-2" />
              <h4 className="font-semibold text-lg">Mobile-Friendly Design</h4>
              <p className="text-gray-600">
                Our designs are optimized for all devices for seamless access.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="text-center my-10">
          <h3 className="text-2xl font-semibold mb-4">What Our Clients Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white shadow-lg p-6 rounded-lg"
              >
                <p className="text-gray-700 italic mb-2">
                  "{testimonial.feedback}"
                </p>
                <h4 className="text-gray-900 font-semibold">
                  - {testimonial.name}
                </h4>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center my-10">
          <p className="text-lg text-gray-700 mb-4">
            Join 500+ businesses already thriving online!
          </p>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-500">
            Create Your Card Now
          </button>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="container mx-auto text-center">
          <p className="mb-2">
            &copy; 2024 onlineMyBusiness. All rights reserved.
          </p>
          <p className="text-sm">A product by Unicron Apps and Website</p>
          <div className="flex justify-center mt-4 space-x-4">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
