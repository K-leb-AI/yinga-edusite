import SchoolInfoForm from "@/app/components/signupComponents/SchoolInfoForm";

const SchoolInformation = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold">Let&apos;s get started</h1>
      <p className="text-gray mb-4 font-light">Unlock seamless management!</p>
      <div className="mb-6 w-4/5"></div>
      <SchoolInfoForm />
    </div>
  );
};

export default SchoolInformation;
