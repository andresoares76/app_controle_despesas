--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-05-02 10:28:20

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 221 (class 1259 OID 16404)
-- Name: Categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Categories" (
    id integer NOT NULL,
    name character varying(255),
    user_id integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Categories" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16403)
-- Name: Categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Categories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Categories_id_seq" OWNER TO postgres;

--
-- TOC entry 4926 (class 0 OID 0)
-- Dependencies: 220
-- Name: Categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Categories_id_seq" OWNED BY public."Categories".id;


--
-- TOC entry 223 (class 1259 OID 16411)
-- Name: Expenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Expenses" (
    id integer NOT NULL,
    title character varying(255),
    amount double precision,
    date timestamp with time zone,
    category_id integer,
    user_id integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Expenses" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16410)
-- Name: Expenses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Expenses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Expenses_id_seq" OWNER TO postgres;

--
-- TOC entry 4927 (class 0 OID 0)
-- Dependencies: 222
-- Name: Expenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Expenses_id_seq" OWNED BY public."Expenses".id;


--
-- TOC entry 217 (class 1259 OID 16389)
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16395)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    password_hash character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16394)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO postgres;

--
-- TOC entry 4928 (class 0 OID 0)
-- Dependencies: 218
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- TOC entry 4757 (class 2604 OID 16407)
-- Name: Categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories" ALTER COLUMN id SET DEFAULT nextval('public."Categories_id_seq"'::regclass);


--
-- TOC entry 4758 (class 2604 OID 16414)
-- Name: Expenses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expenses" ALTER COLUMN id SET DEFAULT nextval('public."Expenses_id_seq"'::regclass);


--
-- TOC entry 4756 (class 2604 OID 16398)
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 4918 (class 0 OID 16404)
-- Dependencies: 221
-- Data for Name: Categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Categories" (id, name, user_id, "createdAt", "updatedAt") FROM stdin;
2	Lazer	1	2025-04-30 19:10:36.939-03	2025-04-30 19:10:36.939-03
4	Aluguel	1	2025-04-30 19:10:52.155-03	2025-04-30 19:10:52.155-03
5	Carro	1	2025-04-30 19:11:00.472-03	2025-04-30 19:11:00.472-03
1	Mercado	1	2025-04-30 19:10:00.918-03	2025-04-30 19:12:29.544-03
6	Casa	1	2025-04-30 23:34:57.257-03	2025-04-30 23:34:57.257-03
7	Alimentação	3	2025-05-01 14:39:56.311-03	2025-05-01 14:39:56.311-03
8	Lazer	3	2025-05-01 14:41:20.588-03	2025-05-01 14:41:20.588-03
10	Casa	3	2025-05-01 14:41:31.418-03	2025-05-01 14:41:31.418-03
11	Carro	3	2025-05-01 14:41:36.372-03	2025-05-01 14:41:36.372-03
12	Educação	3	2025-05-01 21:42:17.69-03	2025-05-01 21:42:17.69-03
13	Saúde	3	2025-05-01 21:42:35.226-03	2025-05-01 21:42:35.226-03
14	Viagem	3	2025-05-01 21:42:45.942-03	2025-05-01 21:42:45.942-03
15	Trabalho	3	2025-05-01 21:42:54.667-03	2025-05-01 21:42:54.667-03
16	Outros	3	2025-05-01 21:43:03.231-03	2025-05-01 21:43:03.231-03
\.


--
-- TOC entry 4920 (class 0 OID 16411)
-- Dependencies: 223
-- Data for Name: Expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Expenses" (id, title, amount, date, category_id, user_id, "createdAt", "updatedAt") FROM stdin;
2	Mercado Zaffari	155	2024-04-01 21:00:00-03	1	1	2025-04-30 19:17:49.166-03	2025-04-30 19:17:49.166-03
3	Teste	10	2024-10-09 21:00:00-03	2	1	2025-05-01 00:24:04.032-03	2025-05-01 00:24:04.032-03
21	Restaurante do Chico	87.5	2025-05-01 22:19:25.926-03	7	3	2025-05-01 22:19:52.863-03	2025-05-01 22:19:52.863-03
22	Lanchonete do Luxe	65	2025-05-01 22:19:52.873-03	8	3	2025-05-01 22:20:14.289-03	2025-05-01 22:20:14.289-03
23	Supermercado Komprão	167.77	2025-05-01 22:20:14.294-03	7	3	2025-05-01 22:20:34.768-03	2025-05-01 22:20:34.768-03
24	Posto Mime	244.45	2025-05-01 22:20:34.777-03	11	3	2025-05-01 22:21:00.341-03	2025-05-01 22:21:00.341-03
25	Mecânica do Sandro	640	2025-05-01 22:21:00.347-03	11	3	2025-05-01 22:21:33.742-03	2025-05-01 22:21:33.742-03
\.


--
-- TOC entry 4914 (class 0 OID 16389)
-- Dependencies: 217
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20250429180239-create-user.js
20250429180258-create-category.js
20250429180307-create-expense.js
\.


--
-- TOC entry 4916 (class 0 OID 16395)
-- Dependencies: 219
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, name, email, password_hash, "createdAt", "updatedAt") FROM stdin;
3	Andre	andre@teste.com	$2b$10$8R5ODsnhJHVFgkna0S8fMuwLaEfiTje9stQMoiBwYx2L2tR11kyvW	2025-05-01 12:46:21.081128-03	2025-05-01 12:46:21.081128-03
\.


--
-- TOC entry 4929 (class 0 OID 0)
-- Dependencies: 220
-- Name: Categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Categories_id_seq"', 16, true);


--
-- TOC entry 4930 (class 0 OID 0)
-- Dependencies: 222
-- Name: Expenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Expenses_id_seq"', 25, true);


--
-- TOC entry 4931 (class 0 OID 0)
-- Dependencies: 218
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 3, true);


--
-- TOC entry 4765 (class 2606 OID 16409)
-- Name: Categories Categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY (id);


--
-- TOC entry 4767 (class 2606 OID 16416)
-- Name: Expenses Expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expenses"
    ADD CONSTRAINT "Expenses_pkey" PRIMARY KEY (id);


--
-- TOC entry 4760 (class 2606 OID 16393)
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- TOC entry 4763 (class 2606 OID 16402)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 4761 (class 1259 OID 16424)
-- Name: Users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Users_email_key" ON public."Users" USING btree (email);


--
-- TOC entry 4768 (class 2606 OID 16419)
-- Name: Expenses Expenses_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expenses"
    ADD CONSTRAINT "Expenses_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public."Categories"(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2025-05-02 10:28:20

--
-- PostgreSQL database dump complete
--

