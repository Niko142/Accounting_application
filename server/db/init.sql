--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 16.9

-- Started on 2025-06-06 23:48:26

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16399)
-- Name: cabinet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cabinet (
    cabinet_id integer NOT NULL,
    number character varying(10) NOT NULL,
    description character varying(90) NOT NULL
);


ALTER TABLE public.cabinet OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 16598)
-- Name: cabinet_cabinet_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.cabinet ALTER COLUMN cabinet_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cabinet_cabinet_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 16415)
-- Name: camera_description; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.camera_description (
    camera_id integer NOT NULL,
    model character varying(45) NOT NULL,
    resolution character varying(45) NOT NULL,
    angle integer NOT NULL,
    bracing character varying(45) NOT NULL,
    price integer NOT NULL,
    location character varying(45),
    employee integer,
    status character varying(45)
);


ALTER TABLE public.camera_description OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16599)
-- Name: camera_description_camera_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.camera_description ALTER COLUMN camera_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.camera_description_camera_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 217 (class 1259 OID 16410)
-- Name: chancellery; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chancellery (
    id_chancellery integer NOT NULL,
    type character varying(45) NOT NULL,
    name character varying(50) NOT NULL,
    unit character varying(10) NOT NULL,
    price numeric(5,2) NOT NULL,
    amounts integer NOT NULL
);


ALTER TABLE public.chancellery OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 16605)
-- Name: chancellery_id_chancellery_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.chancellery ALTER COLUMN id_chancellery ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.chancellery_id_chancellery_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 235 (class 1259 OID 16557)
-- Name: computer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.computer (
    id_computer integer NOT NULL,
    name character varying(45) NOT NULL,
    videocard_id integer NOT NULL,
    processor_id integer NOT NULL,
    mothercard_id integer NOT NULL,
    memory_id integer NOT NULL,
    disk_id integer NOT NULL,
    location character varying(45),
    employee integer,
    status character varying(45)
);


ALTER TABLE public.computer OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 16604)
-- Name: computer_id_computer_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.computer ALTER COLUMN id_computer ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.computer_id_computer_seq
    START WITH 9
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 226 (class 1259 OID 16467)
-- Name: disk; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.disk (
    id_disk integer NOT NULL,
    model character varying(45) NOT NULL,
    volume character varying(45) NOT NULL,
    price integer NOT NULL,
    location character varying(45)
);


ALTER TABLE public.disk OWNER TO postgres;

--
-- TOC entry 256 (class 1259 OID 16625)
-- Name: disk_id_disk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.disk ALTER COLUMN id_disk ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.disk_id_disk_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 16420)
-- Name: employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee (
    employee_id integer NOT NULL,
    name character varying(45) NOT NULL,
    surname character varying(45) NOT NULL,
    patronymic character varying(45) NOT NULL,
    email character varying(45) NOT NULL,
    phone character varying(45) NOT NULL
);


ALTER TABLE public.employee OWNER TO postgres;

--
-- TOC entry 255 (class 1259 OID 16624)
-- Name: employee_employee_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.employee ALTER COLUMN employee_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.employee_employee_id_seq
    START WITH 16
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 233 (class 1259 OID 16530)
-- Name: furniture_description; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.furniture_description (
    furniture_id integer NOT NULL,
    name character varying(45) NOT NULL,
    model character varying(45) NOT NULL,
    price integer NOT NULL,
    location character varying(45),
    employee integer,
    status character varying(45)
);


ALTER TABLE public.furniture_description OWNER TO postgres;

--
-- TOC entry 254 (class 1259 OID 16623)
-- Name: furniture_description_furniture_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.furniture_description ALTER COLUMN furniture_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.furniture_description_furniture_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 227 (class 1259 OID 16472)
-- Name: laptop_description; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.laptop_description (
    laptop_id integer NOT NULL,
    model character varying(50) NOT NULL,
    systems character varying(45) NOT NULL,
    videocard character varying(50) NOT NULL,
    processor character varying(50) NOT NULL,
    memory character varying(45) NOT NULL,
    volume character varying(45) NOT NULL,
    price character varying(15) NOT NULL,
    location character varying(45),
    employee integer,
    status character varying(45)
);


ALTER TABLE public.laptop_description OWNER TO postgres;

--
-- TOC entry 253 (class 1259 OID 16622)
-- Name: laptop_description_laptop_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.laptop_description ALTER COLUMN laptop_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.laptop_description_laptop_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 228 (class 1259 OID 16483)
-- Name: memory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.memory (
    id_memory integer NOT NULL,
    model character varying(45) NOT NULL,
    type character varying(45) NOT NULL,
    volume character varying(45) NOT NULL,
    price integer NOT NULL,
    location character varying(45)
);


ALTER TABLE public.memory OWNER TO postgres;

--
-- TOC entry 252 (class 1259 OID 16621)
-- Name: memory_id_memory_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.memory ALTER COLUMN id_memory ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.memory_id_memory_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 230 (class 1259 OID 16509)
-- Name: mothercard; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mothercard (
    id_mothercard integer NOT NULL,
    model character varying(45) NOT NULL,
    type character varying(45) NOT NULL,
    rate character varying(45) NOT NULL,
    price integer NOT NULL,
    location character varying(45)
);


ALTER TABLE public.mothercard OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 16620)
-- Name: mothercard_id_mothercard_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.mothercard ALTER COLUMN id_mothercard ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.mothercard_id_mothercard_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 16430)
-- Name: pinning_cabinet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pinning_cabinet (
    id_pinning integer NOT NULL,
    date character varying(45) NOT NULL,
    category character varying(45) NOT NULL,
    type character varying(45) NOT NULL,
    reason character varying(45) NOT NULL,
    unit character varying(70) NOT NULL,
    start_location character varying(15) NOT NULL,
    end_location character varying(15) NOT NULL
);


ALTER TABLE public.pinning_cabinet OWNER TO postgres;

--
-- TOC entry 250 (class 1259 OID 16619)
-- Name: pinning_cabinet_id_pinning_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.pinning_cabinet ALTER COLUMN id_pinning ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.pinning_cabinet_id_pinning_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 222 (class 1259 OID 16435)
-- Name: pinning_employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pinning_employee (
    id_pinning integer NOT NULL,
    date character varying(45) NOT NULL,
    category character varying(45) NOT NULL,
    type character varying(45) NOT NULL,
    unit character varying(45) NOT NULL,
    employee integer NOT NULL
);


ALTER TABLE public.pinning_employee OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 16618)
-- Name: pinning_employee_id_pinning_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.pinning_employee ALTER COLUMN id_pinning ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.pinning_employee_id_pinning_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 231 (class 1259 OID 16514)
-- Name: processor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.processor (
    id_processor integer NOT NULL,
    model character varying(45) NOT NULL,
    rate character varying(45) NOT NULL,
    price integer NOT NULL,
    location character varying(45)
);


ALTER TABLE public.processor OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 16616)
-- Name: processor_id_processor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.processor ALTER COLUMN id_processor ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.processor_id_processor_seq
    START WITH 8
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 16446)
-- Name: repair; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.repair (
    id_repair integer NOT NULL,
    date character varying(45) NOT NULL,
    category character varying(45) NOT NULL,
    type character varying(45) NOT NULL,
    model character varying(45) NOT NULL,
    number integer NOT NULL,
    end_date character varying(45) NOT NULL,
    description character varying(45)
);


ALTER TABLE public.repair OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 16615)
-- Name: repair_id_repair_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.repair ALTER COLUMN id_repair ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.repair_id_repair_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 224 (class 1259 OID 16451)
-- Name: replacement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.replacement (
    id_replace integer NOT NULL,
    name character varying(50) NOT NULL,
    type character varying(20) NOT NULL,
    old_part character varying(60) NOT NULL,
    new_part character varying(60) NOT NULL,
    date character varying(30) NOT NULL
);


ALTER TABLE public.replacement OWNER TO postgres;

--
-- TOC entry 246 (class 1259 OID 16614)
-- Name: replacement_id_replace_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.replacement ALTER COLUMN id_replace ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.replacement_id_replace_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 234 (class 1259 OID 16541)
-- Name: scanner_description; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scanner_description (
    scanner_id integer NOT NULL,
    nam character varying(45) NOT NULL,
    color character varying(30) NOT NULL,
    speed character varying(45) NOT NULL,
    price integer NOT NULL,
    location character varying(45),
    employee integer,
    status character varying(45)
);


ALTER TABLE public.scanner_description OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 16612)
-- Name: scanner_description_scanner_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.scanner_description ALTER COLUMN scanner_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.scanner_description_scanner_id_seq
    START WITH 7
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 232 (class 1259 OID 16519)
-- Name: screen_description; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.screen_description (
    screen_id integer NOT NULL,
    model character varying(45) NOT NULL,
    diagonal numeric(5,2) NOT NULL,
    rate character varying(45) NOT NULL,
    type character varying(45) NOT NULL,
    price integer NOT NULL,
    location character varying(45),
    employee integer,
    status character varying(45)
);


ALTER TABLE public.screen_description OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 16611)
-- Name: screen_description_screen_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.screen_description ALTER COLUMN screen_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.screen_description_screen_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 16404)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(25) NOT NULL,
    password character varying(25) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 16610)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 16425)
-- Name: utilization; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utilization (
    id_utilization integer NOT NULL,
    date character varying(45) NOT NULL,
    category character varying(45) NOT NULL,
    type character varying(45) NOT NULL,
    number integer NOT NULL,
    model character varying(45) NOT NULL,
    reason character varying(45) NOT NULL
);


ALTER TABLE public.utilization OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 16609)
-- Name: utilization_id_utilization_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.utilization ALTER COLUMN id_utilization ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.utilization_id_utilization_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 229 (class 1259 OID 16488)
-- Name: ventilation_description; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ventilation_description (
    ventilation_id integer NOT NULL,
    model character varying(45) NOT NULL,
    filter character varying(20) NOT NULL,
    warm character varying(10) NOT NULL,
    price integer NOT NULL,
    location character varying(45),
    employee integer,
    status character varying(45)
);


ALTER TABLE public.ventilation_description OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 16608)
-- Name: ventilation_description_ventilation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.ventilation_description ALTER COLUMN ventilation_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.ventilation_description_ventilation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 225 (class 1259 OID 16462)
-- Name: videocard; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.videocard (
    id_videocard integer NOT NULL,
    model character varying(60) NOT NULL,
    price integer NOT NULL,
    location character varying(45)
);


ALTER TABLE public.videocard OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 16607)
-- Name: videocard_id_videocard_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.videocard ALTER COLUMN id_videocard ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.videocard_id_videocard_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4945 (class 0 OID 16399)
-- Dependencies: 215
-- Data for Name: cabinet; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cabinet (cabinet_id, number, description) FROM stdin;
1	101	Помещение, представляющее основное рабочее пространство
2	134	Зона отдыха
3	38	Переговорная
4	205	Комната руководства
5	121	Рабочее пространство меньшего размера
6	54	Приемная
7	202	Комната администрации
8	Склад	Склад
\.


--
-- TOC entry 4948 (class 0 OID 16415)
-- Dependencies: 218
-- Data for Name: camera_description; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.camera_description (camera_id, model, resolution, angle, bracing, price, location, employee, status) FROM stdin;
2	Logitech BRIO 300	1920x1080	70	Присутствует	3799	Склад	5	В резерве
1	A4Tech PK-910P	1280x720	68	Присутствует	2250	205	5	В эксплуатации
3	A4Tech PK-940HA	1920x1080	75	Присутствует	4299	Склад	8	В резерве
4	Logitech C922 Pro Stream	1920x1080	78	Присутствует	6000	Склад	\N	В резерве
\.


--
-- TOC entry 4947 (class 0 OID 16410)
-- Dependencies: 217
-- Data for Name: chancellery; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chancellery (id_chancellery, type, name, unit, price, amounts) FROM stdin;
1	Письменные принадлежности	Карандаш механический	шт.	5.23	22
2	Бумажно-беловые товары	Бумага для офисной техники, 500л.	пач.	300.00	16
3	Письменные принадлежности	Ручка шариковая с черными чернилами	шт.	6.23	24
5	Письменные принадлежности	Ручка шариковая, черная	шт.	67.00	16
6	Принадлежности для офиса	Степлер офисный	шт.	250.00	6
4	Предметы хранения	Футляр для хранения карандашей и ручек	шт.	360.00	12
7	Предметы хранения	Ящик для хранения оставленных вещей	шт.	900.00	3
8	Предметы хранения	Пенал, школьный	шт.	400.00	1
\.


--
-- TOC entry 4965 (class 0 OID 16557)
-- Dependencies: 235
-- Data for Name: computer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.computer (id_computer, name, videocard_id, processor_id, mothercard_id, memory_id, disk_id, location, employee, status) FROM stdin;
8	ARDOR GAMING NEO M143	7	6	2	5	2	Склад	\N	В резерве
7	iRU Game 510H6SEA	3	2	1	3	1	Склад	\N	В резерве
6	MSI PRO DP21 13M-619RU	2	3	5	1	4	Склад	\N	В резерве
3	ARDOR GAMING NEO M142	4	8	3	2	5	134	2	В эксплуатации
4	OMEN GT21-0013ur	1	1	4	4	3	Склад	8	В резерве
\.


--
-- TOC entry 4956 (class 0 OID 16467)
-- Dependencies: 226
-- Data for Name: disk; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.disk (id_disk, model, volume, price, location) FROM stdin;
6	WD Red Plus WD40EFPX	4 Тб	10990	Склад
4	Seagate SkyHawk	6 Тб	13799	MSI PRO DP21 13M-619RU
3	Toshiba DT02	4 Тб	9199	OMEN GT21-0013ur
2	Toshiba DT01-V Series	1 Тб	6299	ARDOR GAMING NEO M143
1	WD Purple	2 Тб	8799	iRU Game 510H6SEA
5	Seagate BarraCuda	2 Тб	6499	ARDOR GAMING NEO M142
\.


--
-- TOC entry 4949 (class 0 OID 16420)
-- Dependencies: 219
-- Data for Name: employee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee (employee_id, name, surname, patronymic, email, phone) FROM stdin;
2	Петр	Петров	Петрович	sefes@mail.rd	+79324343243
3	Иван	Иванов	Иванович	awdd@mail.com	+73453455342
4	Макар	Макаров	Макарович	fesff@sfef.tu	+74564456534
5	Даниил	Данилов	Данилович	dfgdg@dgr.ury	+73454555555
8	Вячеслав	Вячеславов	Вячеславович	terthert@ses.te	+74343423531
9	Егор	Егоров	Егорович	ergerg@fwe.com	+74554524424
10	Виктор	Викторов	Викторович	rgegregr@mail.ru	+79234242453
14	Федор	Федоров	Федорович	gergreg@wfe.rw	89232323454
15	Михаил	Михайлов	Михайлович	erwgrege@we.tu	+79432453425
16	Екатерина	Екатериновна	Михайловна	greger@fw.ru	+79435242532
\.


--
-- TOC entry 4963 (class 0 OID 16530)
-- Dependencies: 233
-- Data for Name: furniture_description; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.furniture_description (furniture_id, name, model, price, location, employee, status) FROM stdin;
2	Стол	Офисный	3000	Склад	\N	В резерве
1	Стул	Офисный	900	-	\N	В ремонте
\.


--
-- TOC entry 4957 (class 0 OID 16472)
-- Dependencies: 227
-- Data for Name: laptop_description; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.laptop_description (laptop_id, model, systems, videocard, processor, memory, volume, price, location, employee, status) FROM stdin;
5	ASUS Vivobook Go 15 E1504FA-BQ1163	Windows 11	AMD Radeon 610M	AMD Ryzen 5 7520U	8	512 Гб	37999	Склад	\N	В резерве
4	Tecno Megabook K16S	Windows 11	Intel UHD Graphics	Intel Core i5-13420H	16	512 Гб	49999	121	\N	В эксплуатации
3	ASUS ExpertBook B1402CBA-EB0604W	Windows 11	Intel UHD Graphics	Intel Core i3-1215U	8	256 Гб	44499	101	\N	В эксплуатации
2	ASUS VivoBook 16 X1605ZA-MB453W	Windows 11	Intel UHD Graphics	Intel Core i3-1215U	8	512 Гб	49999	134	14	В эксплуатации
1	Acer Aspire 5 A514-56M-37NQ	Windows 11	Встроенная	Intel Core i3	8	512 Гб	44499	Склад	10	В резерве
\.


--
-- TOC entry 4958 (class 0 OID 16483)
-- Dependencies: 228
-- Data for Name: memory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.memory (id_memory, model, type, volume, price, location) FROM stdin;
5	Kingston FURY Beast Black	DDR5	64 Гб	17499	ARDOR GAMING NEO M143
4	Patriot Signature Line	DDR4	32 Гб	6699	OMEN GT21-0013ur
3	ADATA XPG SPECTRIX D35G RGB	DDR4	8 Гб	2699	iRU Game 510H6SEA
1	Kingston FURY Beast Black RGB	DDR4	8 Гб	3200	MSI PRO DP21 13M-619RU
6	Kingston Fury Beast KF556C40BB-16	DDR5	16 Гб	4690	Склад
2	Patriot Viper Elite II	DDR4	16 Гб	4099	ARDOR GAMING NEO M142
\.


--
-- TOC entry 4960 (class 0 OID 16509)
-- Dependencies: 230
-- Data for Name: mothercard; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mothercard (id_mothercard, model, type, rate, price, location) FROM stdin;
6	MSI MPG B550 GAMING PLUS	DDR4	3200	10860	Склад
4	MSI H310M PRO-VDH	DDR4	2666	6299	OMEN GT21-0013ur
2	GIGABYTE A520M H	DDR4	3200	7899	ARDOR GAMING NEO M143
1	ASUS PRIME A520M-E	DDR4	3200	8599	iRU Game 510H6SEA
5	GIGABYTE A620M H	DDR5	5200	8499	MSI PRO DP21 13M-619RU
3	GIGABYTE H510M K V2	DDR4	3200	5999	ARDOR GAMING NEO M142
\.


--
-- TOC entry 4951 (class 0 OID 16430)
-- Dependencies: 221
-- Data for Name: pinning_cabinet; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pinning_cabinet (id_pinning, date, category, type, reason, unit, start_location, end_location) FROM stdin;
2	2025-04-10T23:09	Оргтехника	Ноутбук	Введение в эксплуатацию	Tecno Megabook K16S	Склад	5
1	2025-04-10T16:42	Оргтехника	Камера	Смена рабочего пространства	A4Tech PK-910P	121	205
3	2025-06-06T22:00	Система вентиляции	-	Введение в эксплуатацию	Ballu BSAGI-07HN8	Склад	54
\.


--
-- TOC entry 4952 (class 0 OID 16435)
-- Dependencies: 222
-- Data for Name: pinning_employee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pinning_employee (id_pinning, date, category, type, unit, employee) FROM stdin;
2	2024-04-12T20:24	Оргтехника	Камера	Logitech BRIO 300	3
1	2024-04-16T01:13	Мебель	-	Кресло Игровое	2
4	2025-06-06T21:41	Система вентиляции	-	Tesla TA36FFML-12410A	3
\.


--
-- TOC entry 4961 (class 0 OID 16514)
-- Dependencies: 231
-- Data for Name: processor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.processor (id_processor, model, rate, price, location) FROM stdin;
7	AMD Ryzen 5 9600X	3.9	20990	Склад
6	Intel Core i7-10700F OEM	2.9	20799	ARDOR GAMING NEO M143
3	AMD Ryzen 9 5900X OEM	3.7	32499	MSI PRO DP21 13M-619RU
2	AMD Ryzen 7 5700X	3.4	17799	iRU Game 510H6SEA
9	AMD Ryzen5 5600 AM4 OEM	3.5	6999	Склад
8	AMD Ryzen 7 5700X3D	3.0	26299	ARDOR GAMING NEO M142
4	AMD Ryzen 7 5700X3D	3.0	26499	Склад
1	Intel Core i5-10400F	2.9	10999	OMEN GT21-0013ur
\.


--
-- TOC entry 4953 (class 0 OID 16446)
-- Dependencies: 223
-- Data for Name: repair; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.repair (id_repair, date, category, type, model, number, end_date, description) FROM stdin;
1	2025-05-13T21:42	Система вентиляции	-	Tesla TA36FFML-12410A	4	2024-05-07T16:50	Проблема с фильтром
2	2025-06-06T23:28	Мебель	Мебель	Стул Офисный	1	2025-06-06T23:30	Ножка стула сломана
\.


--
-- TOC entry 4954 (class 0 OID 16451)
-- Dependencies: 224
-- Data for Name: replacement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.replacement (id_replace, name, type, old_part, new_part, date) FROM stdin;
1	OMEN GT21-0013ur	Видеокарта	MSI GeForce RTX 4060 VENTUS 2X BLACK OC	Palit GeForce RTX 4060 Dual OC	2024-05-18T01:22
5	OMEN GT21-0013ur	Процессор	AMD Ryzen 7 5700X3D	Intel Core i5-10400F	2025-06-13T23:13
\.


--
-- TOC entry 4964 (class 0 OID 16541)
-- Dependencies: 234
-- Data for Name: scanner_description; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.scanner_description (scanner_id, nam, color, speed, price, location, employee, status) FROM stdin;
5	Pantum CM1100DW	Цветная	18	48999	Склад	\N	В резерве
4	HP LaserJet Tank MFP 1005	Черно-белая	22	20699	Склад	2	В резерве
3	HP Laser MFP 135w	Черно-белая	20	22199	Склад	3	В резерве
2	Pantum M45	Черно-белая	22	14449	Склад	\N	В резерве
6	Brother DCP-L5510DN	Черно-белая	48	27999	205	\N	В эксплуатации
\.


--
-- TOC entry 4962 (class 0 OID 16519)
-- Dependencies: 232
-- Data for Name: screen_description; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.screen_description (screen_id, model, diagonal, rate, type, price, location, employee, status) FROM stdin;
6	LG UltraGear 27GN600-B	27.00	144	IPS	19230	Склад	\N	В резерве
5	Acer Nitro XF253QXbmiiprx	24.50	240	IPS	24999	Склад	\N	В резерве
2	Philips 27M1C5200W EVNIA 3000	27.00	240	VA	21999	Склад	\N	В резерве
1	MSI Modern MD241P	23.80	75	IPS	12999	54	4	В эксплуатации
3	LG UltraGear 27GN600-B	27.00	144	IPS	19230	Склад	\N	В резерве
\.


--
-- TOC entry 4946 (class 0 OID 16404)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, password) FROM stdin;
1	nick	123
2	Niko	142
3	qwe	qwe
\.


--
-- TOC entry 4950 (class 0 OID 16425)
-- Dependencies: 220
-- Data for Name: utilization; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utilization (id_utilization, date, category, type, number, model, reason) FROM stdin;
1	2024-05-02T22:53	Система вентиляции	-	1	Кондиционер Hyundai HAC-09i/S-PRO	Наличие дефекта/ов
\.


--
-- TOC entry 4959 (class 0 OID 16488)
-- Dependencies: 229
-- Data for Name: ventilation_description; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventilation_description (ventilation_id, model, filter, warm, price, location, employee, status) FROM stdin;
1	Dahatsu DA-07H	Угольный	Да	19999	134	4	В эксплуатации
3	Dantex RK-07SAT/RK-07SATE	Базовый	Да	26799	134	9	В эксплуатации
4	TCL BREEZEIN 09 INV	С ионами серебра	Да	35999	38	4	В эксплуатации
5	TCL ELI 24 INV/R1	С ионами серебра	Да	56999	-	\N	В ремонте
2	Tesla TA36FFML-12410A	Плазменный	Да	30299	-	3	В ремонте
6	Ballu BSAGI-07HN8	Плазменный	Да	27500	54	\N	В эксплуатации
\.


--
-- TOC entry 4955 (class 0 OID 16462)
-- Dependencies: 225
-- Data for Name: videocard; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.videocard (id_videocard, model, price, location) FROM stdin;
6	 MSI GeForce RTX 4070 Ti SUPER GAMING X SLIM WHITE	119999	Склад
3	Palit GeForce RTX 4060 Dual OC	34499	iRU Game 510H6SEA
2	Palit  GeForce RTX 3050	22999	MSI PRO DP21 13M-619RU
1	MSI RTX 3060 Gaming	34990	OMEN GT21-0013ur
10	Gigabyte NVIDIA GeForce RTX 4060 GV-N4060WF2OC-8GD	33300	Склад
9	PowerColor AMD Radeon RX 6600 Fighter	22999	Склад
7	RTX 3050	34535	ARDOR GAMING NEO M143
4	MSI GeForce RTX 4060 VENTUS 2X BLACK OC	35999	ARDOR GAMING NEO M142
\.


--
-- TOC entry 4992 (class 0 OID 0)
-- Dependencies: 236
-- Name: cabinet_cabinet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cabinet_cabinet_id_seq', 10, true);


--
-- TOC entry 4993 (class 0 OID 0)
-- Dependencies: 237
-- Name: camera_description_camera_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.camera_description_camera_id_seq', 4, true);


--
-- TOC entry 4994 (class 0 OID 0)
-- Dependencies: 239
-- Name: chancellery_id_chancellery_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chancellery_id_chancellery_seq', 9, true);


--
-- TOC entry 4995 (class 0 OID 0)
-- Dependencies: 238
-- Name: computer_id_computer_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.computer_id_computer_seq', 9, false);


--
-- TOC entry 4996 (class 0 OID 0)
-- Dependencies: 256
-- Name: disk_id_disk_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.disk_id_disk_seq', 6, true);


--
-- TOC entry 4997 (class 0 OID 0)
-- Dependencies: 255
-- Name: employee_employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_employee_id_seq', 16, true);


--
-- TOC entry 4998 (class 0 OID 0)
-- Dependencies: 254
-- Name: furniture_description_furniture_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.furniture_description_furniture_id_seq', 2, true);


--
-- TOC entry 4999 (class 0 OID 0)
-- Dependencies: 253
-- Name: laptop_description_laptop_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.laptop_description_laptop_id_seq', 5, true);


--
-- TOC entry 5000 (class 0 OID 0)
-- Dependencies: 252
-- Name: memory_id_memory_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.memory_id_memory_seq', 6, true);


--
-- TOC entry 5001 (class 0 OID 0)
-- Dependencies: 251
-- Name: mothercard_id_mothercard_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mothercard_id_mothercard_seq', 6, true);


--
-- TOC entry 5002 (class 0 OID 0)
-- Dependencies: 250
-- Name: pinning_cabinet_id_pinning_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pinning_cabinet_id_pinning_seq', 3, true);


--
-- TOC entry 5003 (class 0 OID 0)
-- Dependencies: 249
-- Name: pinning_employee_id_pinning_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pinning_employee_id_pinning_seq', 4, true);


--
-- TOC entry 5004 (class 0 OID 0)
-- Dependencies: 248
-- Name: processor_id_processor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.processor_id_processor_seq', 9, true);


--
-- TOC entry 5005 (class 0 OID 0)
-- Dependencies: 247
-- Name: repair_id_repair_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.repair_id_repair_seq', 2, true);


--
-- TOC entry 5006 (class 0 OID 0)
-- Dependencies: 246
-- Name: replacement_id_replace_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.replacement_id_replace_seq', 5, true);


--
-- TOC entry 5007 (class 0 OID 0)
-- Dependencies: 245
-- Name: scanner_description_scanner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.scanner_description_scanner_id_seq', 7, false);


--
-- TOC entry 5008 (class 0 OID 0)
-- Dependencies: 244
-- Name: screen_description_screen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.screen_description_screen_id_seq', 6, true);


--
-- TOC entry 5009 (class 0 OID 0)
-- Dependencies: 243
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 3, true);


--
-- TOC entry 5010 (class 0 OID 0)
-- Dependencies: 242
-- Name: utilization_id_utilization_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.utilization_id_utilization_seq', 1, true);


--
-- TOC entry 5011 (class 0 OID 0)
-- Dependencies: 241
-- Name: ventilation_description_ventilation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventilation_description_ventilation_id_seq', 6, true);


--
-- TOC entry 5012 (class 0 OID 0)
-- Dependencies: 240
-- Name: videocard_id_videocard_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.videocard_id_videocard_seq', 10, true);


--
-- TOC entry 4735 (class 2606 OID 16403)
-- Name: cabinet cabinet_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cabinet
    ADD CONSTRAINT cabinet_pkey PRIMARY KEY (cabinet_id);


--
-- TOC entry 4741 (class 2606 OID 16419)
-- Name: camera_description camera_description_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.camera_description
    ADD CONSTRAINT camera_description_pkey PRIMARY KEY (camera_id);


--
-- TOC entry 4739 (class 2606 OID 16414)
-- Name: chancellery chancellery_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chancellery
    ADD CONSTRAINT chancellery_pkey PRIMARY KEY (id_chancellery);


--
-- TOC entry 4782 (class 2606 OID 16561)
-- Name: computer computer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.computer
    ADD CONSTRAINT computer_pkey PRIMARY KEY (id_computer);


--
-- TOC entry 4759 (class 2606 OID 16471)
-- Name: disk disk_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disk
    ADD CONSTRAINT disk_pkey PRIMARY KEY (id_disk);


--
-- TOC entry 4744 (class 2606 OID 16424)
-- Name: employee employee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (employee_id);


--
-- TOC entry 4777 (class 2606 OID 16534)
-- Name: furniture_description furniture_description_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.furniture_description
    ADD CONSTRAINT furniture_description_pkey PRIMARY KEY (furniture_id);


--
-- TOC entry 4762 (class 2606 OID 16476)
-- Name: laptop_description laptop_description_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laptop_description
    ADD CONSTRAINT laptop_description_pkey PRIMARY KEY (laptop_id);


--
-- TOC entry 4764 (class 2606 OID 16487)
-- Name: memory memory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.memory
    ADD CONSTRAINT memory_pkey PRIMARY KEY (id_memory);


--
-- TOC entry 4769 (class 2606 OID 16513)
-- Name: mothercard mothercard_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mothercard
    ADD CONSTRAINT mothercard_pkey PRIMARY KEY (id_mothercard);


--
-- TOC entry 4748 (class 2606 OID 16434)
-- Name: pinning_cabinet pinning_cabiner_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pinning_cabinet
    ADD CONSTRAINT pinning_cabiner_pkey PRIMARY KEY (id_pinning);


--
-- TOC entry 4751 (class 2606 OID 16439)
-- Name: pinning_employee pinning_employee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pinning_employee
    ADD CONSTRAINT pinning_employee_pkey PRIMARY KEY (id_pinning);


--
-- TOC entry 4771 (class 2606 OID 16518)
-- Name: processor processor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.processor
    ADD CONSTRAINT processor_pkey PRIMARY KEY (id_processor);


--
-- TOC entry 4753 (class 2606 OID 16450)
-- Name: repair repair_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repair
    ADD CONSTRAINT repair_pkey PRIMARY KEY (id_repair);


--
-- TOC entry 4755 (class 2606 OID 16455)
-- Name: replacement replacement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.replacement
    ADD CONSTRAINT replacement_pkey PRIMARY KEY (id_replace);


--
-- TOC entry 4780 (class 2606 OID 16545)
-- Name: scanner_description scanner_description_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scanner_description
    ADD CONSTRAINT scanner_description_pkey PRIMARY KEY (scanner_id);


--
-- TOC entry 4774 (class 2606 OID 16523)
-- Name: screen_description screen_description_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.screen_description
    ADD CONSTRAINT screen_description_pkey PRIMARY KEY (screen_id);


--
-- TOC entry 4737 (class 2606 OID 16408)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4746 (class 2606 OID 16429)
-- Name: utilization utilization_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilization
    ADD CONSTRAINT utilization_pkey PRIMARY KEY (id_utilization);


--
-- TOC entry 4767 (class 2606 OID 16492)
-- Name: ventilation_description ventilation_description_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventilation_description
    ADD CONSTRAINT ventilation_description_pkey PRIMARY KEY (ventilation_id);


--
-- TOC entry 4757 (class 2606 OID 16466)
-- Name: videocard videocard_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videocard
    ADD CONSTRAINT videocard_pkey PRIMARY KEY (id_videocard);


--
-- TOC entry 4742 (class 1259 OID 16461)
-- Name: fki_cameras; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_cameras ON public.camera_description USING btree (employee);


--
-- TOC entry 4783 (class 1259 OID 16567)
-- Name: fki_computers; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_computers ON public.computer USING btree (employee);


--
-- TOC entry 4784 (class 1259 OID 16573)
-- Name: fki_disk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_disk ON public.computer USING btree (disk_id);


--
-- TOC entry 4749 (class 1259 OID 16445)
-- Name: fki_employee; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_employee ON public.pinning_employee USING btree (employee);


--
-- TOC entry 4775 (class 1259 OID 16540)
-- Name: fki_furnitures; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_furnitures ON public.furniture_description USING btree (employee);


--
-- TOC entry 4760 (class 1259 OID 16482)
-- Name: fki_laptops; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_laptops ON public.laptop_description USING btree (employee);


--
-- TOC entry 4785 (class 1259 OID 16579)
-- Name: fki_memory; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_memory ON public.computer USING btree (memory_id);


--
-- TOC entry 4786 (class 1259 OID 16585)
-- Name: fki_mothercard; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_mothercard ON public.computer USING btree (mothercard_id);


--
-- TOC entry 4787 (class 1259 OID 16591)
-- Name: fki_processor; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_processor ON public.computer USING btree (processor_id);


--
-- TOC entry 4778 (class 1259 OID 16551)
-- Name: fki_scanners; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_scanners ON public.scanner_description USING btree (employee);


--
-- TOC entry 4772 (class 1259 OID 16529)
-- Name: fki_screens; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_screens ON public.screen_description USING btree (employee);


--
-- TOC entry 4765 (class 1259 OID 16503)
-- Name: fki_ventilations; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_ventilations ON public.ventilation_description USING btree (employee);


--
-- TOC entry 4788 (class 1259 OID 16597)
-- Name: fki_videocard; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_videocard ON public.computer USING btree (videocard_id);


--
-- TOC entry 4789 (class 2606 OID 16504)
-- Name: camera_description cameras; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.camera_description
    ADD CONSTRAINT cameras FOREIGN KEY (employee) REFERENCES public.employee(employee_id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- TOC entry 4796 (class 2606 OID 16562)
-- Name: computer computers; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.computer
    ADD CONSTRAINT computers FOREIGN KEY (employee) REFERENCES public.employee(employee_id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- TOC entry 4797 (class 2606 OID 16568)
-- Name: computer disk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.computer
    ADD CONSTRAINT disk FOREIGN KEY (disk_id) REFERENCES public.disk(id_disk) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4794 (class 2606 OID 16535)
-- Name: furniture_description furnitures; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.furniture_description
    ADD CONSTRAINT furnitures FOREIGN KEY (employee) REFERENCES public.employee(employee_id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- TOC entry 4791 (class 2606 OID 16552)
-- Name: laptop_description laptops; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laptop_description
    ADD CONSTRAINT laptops FOREIGN KEY (employee) REFERENCES public.employee(employee_id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- TOC entry 4798 (class 2606 OID 16574)
-- Name: computer memory; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.computer
    ADD CONSTRAINT memory FOREIGN KEY (memory_id) REFERENCES public.memory(id_memory) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4799 (class 2606 OID 16580)
-- Name: computer mothercard; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.computer
    ADD CONSTRAINT mothercard FOREIGN KEY (mothercard_id) REFERENCES public.mothercard(id_mothercard) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4790 (class 2606 OID 16440)
-- Name: pinning_employee pinning_employee_employee_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pinning_employee
    ADD CONSTRAINT pinning_employee_employee_fkey FOREIGN KEY (employee) REFERENCES public.employee(employee_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4800 (class 2606 OID 16586)
-- Name: computer processor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.computer
    ADD CONSTRAINT processor FOREIGN KEY (processor_id) REFERENCES public.processor(id_processor) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4795 (class 2606 OID 16546)
-- Name: scanner_description scanners; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scanner_description
    ADD CONSTRAINT scanners FOREIGN KEY (employee) REFERENCES public.employee(employee_id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- TOC entry 4793 (class 2606 OID 16524)
-- Name: screen_description screens; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.screen_description
    ADD CONSTRAINT screens FOREIGN KEY (employee) REFERENCES public.employee(employee_id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- TOC entry 4792 (class 2606 OID 16498)
-- Name: ventilation_description ventilations; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventilation_description
    ADD CONSTRAINT ventilations FOREIGN KEY (employee) REFERENCES public.employee(employee_id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- TOC entry 4801 (class 2606 OID 16592)
-- Name: computer videocard; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.computer
    ADD CONSTRAINT videocard FOREIGN KEY (videocard_id) REFERENCES public.videocard(id_videocard) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


-- Completed on 2025-06-06 23:48:26

--
-- PostgreSQL database dump complete
--

