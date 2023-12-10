import React, {FC, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ArrowLeftCircle, ArrowLeftCircleFill} from "react-bootstrap-icons";

interface BackButtonArrowCircleProps {
  className?:string;
  arrowSize?:"fs-1" | "fs-2" | "fs-3" | "fs-4";
}

const BackButtonArrowCircle:FC<BackButtonArrowCircleProps> = ({className, arrowSize}) => {

  const navigate = useNavigate();
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <div
      onClick={() => navigate(-1)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`d-flex align-items-center mt-1 ${className}`}
    >
      {
        isHover ? <ArrowLeftCircleFill className={`${arrowSize || `fs-3`} text-light btn-pointer`}/>
          : <ArrowLeftCircle className={`${arrowSize || `fs-3`} text-light btn-pointer`}/>
      }
    </div>
  );
};

export default BackButtonArrowCircle;