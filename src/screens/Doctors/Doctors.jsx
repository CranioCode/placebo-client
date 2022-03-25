import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { DoctorCard, Input } from "../../components";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [displayDoctors, setDisplayDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/doctor/${id}`, { replace: true });
  };

  const sortByRating = useCallback(
    (type) => {
      if (type === "none") {
        setDisplayDoctors(doctors);
      } else if (type === "asc") {
        setDisplayDoctors((prevDoctors) => {
          const newPrevDoctors = [...prevDoctors];
          newPrevDoctors.sort((a, b) => {
            if (a.rating.value > b.rating.value) return 1;
            else if (a.rating.value < b.rating.value) return -1;
            else return 0;
          });
          return newPrevDoctors;
        });
      } else if (type === "desc") {
        setDisplayDoctors((prevDoctors) => {
          const newPrevDoctors = [...prevDoctors];
          newPrevDoctors.sort((a, b) => {
            if (a.rating.value > b.rating.value) return -1;
            else if (a.rating.value < b.rating.value) return 1;
            else return 0;
          });
          return newPrevDoctors;
        });
      }
    },
    [doctors]
  );

  const searchByName = useCallback(
    (query) => {
      if (query === "") {
        setDisplayDoctors(doctors);
      } else {
        setDisplayDoctors((prevDoctors) => {
          const newPrevDoctors = [...prevDoctors];
          return newPrevDoctors.filter((doctor) => {
            const doctorName = doctor.name;
            return doctorName.toLowerCase().includes(query.toLowerCase());
          });
        });
      }
    },
    [doctors]
  );

  const filterSpecialization = useCallback(
    (spl) => {
      if (spl === "all") {
        setDisplayDoctors(doctors);
      } else {
        setDisplayDoctors(
          doctors.filter((doctor) => doctor.specializations.includes(spl))
        );
      }
    },
    [doctors]
  );

  // ? Fetch All Doctors on Load
  // useEffect(() => {
  //   (async () => {
  //     const { success, data } = await fetchAllDoctors();
  //     if (success) {
  //       setDoctors([...data]);
  //       setDisplayDoctors(data);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    const spl = [];
    doctors.forEach((doctor) => {
      doctor.specializations.forEach((docSpl) => {
        if (!spl.includes(docSpl)) {
          spl.push(docSpl);
        }
      });
    });
    setSpecializations(spl);
  }, [doctors]);

  return (
    <section className="inline-block h-full w-full">
      <div className="my-[5vh] mx-[25vw]">
        <Input
          type="text"
          placeholder="Search for Doctors"
          onChange={(e) => {
            searchByName(e.target.value);
          }}
        />
      </div>
      <div className="py-[2vh] px-[20vh] bg-tertiary flex justify-around">
        <select
          name="availability"
          defaultValue={"Availability"}
          className="py-[0.5vh] px-[4vh] text-xl outline-none rounded-sm cursor-pointer"
        >
          <option value="Availability" disabled>
            Availability
          </option>
          <option value="All">All</option>
          <option value="Today">Today</option>
          <option value="Tommorrow">Tommorrow</option>
        </select>
        <select
          name="specialization"
          defaultValue={"Specialization"}
          className="py-[0.5vh] px-[4vh] text-xl outline-none rounded-sm cursor-pointer"
          onChange={(e) => {
            filterSpecialization(e.target.value);
          }}
        >
          <option value="Specialization" disabled>
            Specializations
          </option>
          <option value="all">All</option>
          {specializations.map((spl) => (
            <option value={spl} key={spl}>
              {spl}
            </option>
          ))}
        </select>
        <select
          name="rating"
          defaultValue={"Rating"}
          className="py-[0.5vh] px-[4vh] text-xl outline-none rounded-sm cursor-pointer"
          onChange={(e) => {
            sortByRating(e.target.value);
          }}
        >
          <option value="Rating" disabled>
            Rating
          </option>
          <option value="none">None</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
      <div className="px-[4vh] py-[8vh] flex flex-wrap justify-evenly">
        {displayDoctors.map((doctor) => (
          <DoctorCard onClick={handleClick} doctor={doctor} key={doctor.uid} />
        ))}
        {!displayDoctors.length && "No doctors found."}
      </div>
    </section>
  );
};

export default Doctors;
