import React from "react";

function Title({ title, subTitle, align = "center" }) {
  return (
    <div
      className={`mb-10 ${
        align === "left" ? "text-left" : "text-center"
      }`}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        {title}
      </h2>

      <div
        className={`w-20 h-1 bg-primary rounded-full mt-3 ${
          align === "left" ? "" : "mx-auto"
        }`}
      ></div>

      {subTitle && (
        <p className="mt-4 text-gray-500 text-base md:text-lg max-w-2xl leading-7">
          {subTitle}
        </p>
      )}
    </div>
  );
}

export default Title;