import { useState } from "react";
import Header from "../common/Header";
import Footer from "../common/footer";
import { apiUrl } from "../common/Http";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    sub: "",
    msg: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  // handle input changes
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // handle submit
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      // Send main email
      const res = await fetch(`${apiUrl}send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // Send replay/confirmation email
      const replay = await fetch(`${apiUrl}replay-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok && replay.ok) {
        setStatus({
          type: "success",
          message: "Your message has been sent successfully! ✅",
        });
        setForm({ name: "", email: "", phone: "", sub: "", msg: "" }); // reset form
      } else {
        setStatus({
          type: "error",
          message: "Something went wrong. Please try again later. ❌",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: "Failed to send message. Please check your connection.",
      });
      console.log("Something Went Wrong ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Contact Us</h2>
              <p className="text-gray-600 mt-2">
                Our dedicated experts are here to help you with any of your
                questions. Fill out the form below and we’ll be in touch
                shortly.
              </p>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow p-8">
                <h3 className="text-lg font-semibold mb-4">📞 Call Us</h3>
                <p className="text-gray-600">(888-000-0003)</p>
                <p className="text-gray-600 mb-6">(222-123-1245)</p>

                <h3 className="text-lg font-semibold mb-4">📧 Write Us</h3>
                <p className="text-gray-600">original.rural.construction@gmail.com</p>
                <p className="text-gray-600 mb-6">info@example.com</p>

                <h3 className="text-lg font-semibold mb-4">📍 Address</h3>
                <p className="text-gray-600">
                  B-13X, Rajaji Puram <br />
                  Lucknow, Uttar Pradesh, 226017 <br />
                  0522400XXXX
                </p>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow p-8">
                <form onSubmit={onSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      placeholder="Enter Your Name"
                      required
                      className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="Enter Your Email"
                      required
                      className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      placeholder="Phone No."
                      className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                      type="text"
                      name="sub"
                      value={form.sub}
                      onChange={onChange}
                      placeholder="Subject"
                      required
                      className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <textarea
                    rows="5"
                    name="msg"
                    value={form.msg}
                    onChange={onChange}
                    placeholder="Your Message"
                    required
                    className="w-full border border-gray-300 rounded-md p-3 mt-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  ></textarea>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-full bg-pink-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-pink-600 transition disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "SEND NOW"}
                  </button>
                </form>

                {/* Status message */}
                {status.message && (
                  <p
                    className={`mt-4 text-center font-medium ${
                      status.type === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {status.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactUs;
