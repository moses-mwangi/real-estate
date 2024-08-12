"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Agent {
  name: string;
  role: string;
  image: string;
  information: string;
}

interface Property {
  _id: string;
  image: [string];
  description: string;
  about: string;
  type: string;
  bathrooms: number;
  bedrooms: number;
  garages: number;
  createdAt: Date;
  price: number;
  city: string;
  zipcode: number;
  address: string;
  position: [number];
}

export default function TestPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [dat, setDat] = useState<Property[]>([]);

  useEffect(() => {
    async function fetchAgents() {
      const res = await axios.get("http://127.0.0.1:3008/api/agents");
      const propety = await axios.get("http://127.0.0.1:3008/api/property");

      setDat(propety.data.data);

      setAgents(res.data.data);
    }

    fetchAgents();
  }, []);

  return (
    <div className="h-svh pt-40">
      <Button onClick={() => console.log(dat, agents)}>Click</Button>

      {dat?.map((el) => (
        <div key={el._id}>
          <p className="">{el.address}</p>
          <p>{el.bedrooms}</p>

          {el.image.map((arr) => (
            <Image
              src={`${arr}`}
              key={arr}
              alt={el.city}
              width={100}
              height={100}
              priority
              // className="bg-blue-800 p-4"
            />
          ))}
        </div>
      ))}

      {agents?.map((agent) => (
        <div key={agent.name}>
          <p>{agent.name}</p>
          <Image
            src={`${agent.image}`}
            alt={agent.name}
            width={100}
            height={100}
            priority
          />
        </div>
      ))}
    </div>
  );
}
