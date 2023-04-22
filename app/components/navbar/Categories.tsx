"use client";

import Container from "../Container";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This propertiy is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This propertiy has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This propertiy is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This propertiy is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This propertiy has a pool!",
  },
  {
    label: "Island",
    icon: GiIsland,
    description: "This propertiy is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This propertiy is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This propertiy has skiing activities!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This propertiy is in a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This propertiy has camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This propertiy is in a snow!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This propertiy is in a cave!",
  },
  {
    label: "Dessert",
    icon: GiCactus,
    description: "This propertiy is in the dessert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This propertiy is in the barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This propertiy is luxurious!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
    pt-4
    flex
    flex-row
    items-center
    justify-between
    overflow-x-auto
    "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
