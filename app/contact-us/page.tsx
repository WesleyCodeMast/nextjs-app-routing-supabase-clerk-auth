import ContactForm from "../components/ContactForm";
import { Metadata } from "next";
export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = "Allfreechips Contact page";
  const description = "Allfreechips Contact page.";

  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}
export default async function Dash() {
  async function sendMessage({ name, email, message }) {
    "use server";
    const result = {
      data: {
        author: email,
        name: name,
        message: message,
        toEmail: "support@allfreechips.com",
      },
    };

    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // resend.emails.send({
    //   from: email,
    //   to: "chris@trenkas.com",
    //   subject: "Allfreechips Support Message",
    //   html: message,
    // });

    const info = await transporter.sendMail({
      from: "support@allfreechips.com", // sender address
      to: "support@allfreechips.com", // list of receivers
      subject: "Allfreechips Support Request ✔", // Subject line
      text: email + " " + message, // plain text body
      html: email + " " + message, // html body
    });

    return result;
  }

  return (
    <section className="relative overflow-hidden bg-gray-50 py-12">
      <div className="container relative z-10 mx-auto px-4">
        <div className="-m-8 flex flex-wrap">
          <div className="w-full p-8 md:w-1/2">
            <div className="flex h-full flex-col justify-between">
              <div className="md:max-w-md mb-12 block">
                <p className="tracking-px my-6 text-sm font-bold uppercase text-sky-600">
                  Get a question?
                </p>
                <p className="tracking-px mb-6 text-sm font-bold uppercase text-sky-600">
                  Feel free to contact us!
                </p>
                <h1 className="font-heading tracking-px-n text-3xl font-bold leading-none md:text-5xl xl:text-7xl">
                  Get in touch and let us know how we can help.
                </h1>
                <h2 className="mt-8 text-2xl">
                  Submit your info and we&apos;ll get back to you as soon as
                  possible.
                </h2>
              </div>
            </div>
          </div>
          <div className="w-full p-8 md:w-1/2">
            <ContactForm sendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </section>
  );
}
