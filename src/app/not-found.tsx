import Content from "@/components/Content/Content";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <html>
      <body>
        <Content extraClasses="tw-h-screen tw-justify-center ">
          <div className="tw-flex tw-flex-col tw-gap-3">
            <Image
              src="/assets/icons/logo.svg"
              alt="Activazon"
              width={68}
              height={68}
            />
            <p className="tw-text-3xl tw-text-blue-dark tw-font-semibold">
              How did that happen? 👀
            </p>
            <p className="tw-text-lg tw-text-blue-dark">
              We could not find what you are looking for, try going back to Home
            </p>
            <Link
              href="/search"
              className="tw-bg-blue-light tw-py-2 tw-px-4 tw-text-lg tw-rounded-md tw-text-white"
            >
              <i className="bi bi-house-fill" /> Home
            </Link>
          </div>
        </Content>
      </body>
    </html>
  );
};

export default NotFound;
