import { useState, useEffect } from "react";
import { getBookClubs } from "./callApi";


const [clubs, setClubs] = useState<BookClub[]>([])