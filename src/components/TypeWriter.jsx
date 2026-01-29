import { useEffect, useState } from "react";

const roles = [
  "Front End Developer",
  "React Js Developer",
  "Backend Developer",
  "MERN Stack Developer",
];

const TypeWriter = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, subIndex + 1));
        setSubIndex(subIndex + 1);

        if (subIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        setText(current.substring(0, subIndex - 1));
        setSubIndex(subIndex - 1);

        if (subIndex === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 60 : 120);

    return () => clearTimeout(timer);
  }, [subIndex, index, isDeleting]);

  return (
    <h1 className="text-3xl md:text-4xl font-bold text-blue-500">
      {text}
      <span className="animate-pulse">|</span>
    </h1>
  );
};

export default TypeWriter;
