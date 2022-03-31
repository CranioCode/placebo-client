import { calculateExperience } from "../../global/doctor";

const DoctorCard = ({ onClick, doctor }) => {
  return (
    <article
      onClick={() => {
        onClick(doctor._id);
      }}
      className="w-1/4 h-[38vh] mx-[2vh] mb-[4vh] cursor-pointer shadow-lg rounded-lg relative hover:scale-105 transition-all"
    >
      <div className="h-2/5 w-full bg-tertiary rounded-t-lg flex justify-center items-center">
        <h1 className="text-back font-semibold text-3xl ">{doctor.name}</h1>
      </div>
      <div>
        <div className="w-[12vh] h-[12vh] rounded-full bg-secondary flex justify-center items-center absolute top-[40%] left-[3%] -translate-y-[40%]">
          <img
            src={doctor.profilePic}
            alt={doctor.name}
            className="w-[90%] h-[90%] rounded-full object-cover"
          />
        </div>
        <div className="absolute mt-2 left-[calc(12vh+5%)]">
          <h2 className="text-base leading-5">
            {doctor.specializations.map((qualification) => `${qualification},`)}
          </h2>
          <p className="text-sm italic leading-4">
            {doctor.qualifications.map((qualification) => `${qualification},`)}
          </p>
          <p className="text-sm leading-4">
            Experience of {calculateExperience(doctor.yearOfStartingCareer)}{" "}
            years
          </p>
        </div>
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 flex justify-center items-center">
          <span className="mr-2 text-2xl">{doctor?.rating?.value}</span>
          <img
            src="/src/img/assets/star.png"
            alt="rating"
            className="h-[25px] w-[25px]"
          />
        </div>
        <div className="p-[2vh] absolute top-[60%]">
          <p className="text-justify leading-5">
            {doctor?.description?.replace(/^(.{150}[^\s]*).*/, "$1")}...
          </p>
        </div>
      </div>
    </article>
  );
};

export default DoctorCard;
