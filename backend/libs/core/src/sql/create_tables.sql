-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.file
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    name character varying COLLATE pg_catalog."default",
    CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.migrations
(
    id integer NOT NULL DEFAULT nextval('migrations_id_seq'::regclass),
    "timestamp" bigint NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.procurement_user
(
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    username character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default",
    "roleId" uuid,
    verified boolean NOT NULL DEFAULT false,
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    CONSTRAINT "PK_58698d7ee64e04ebbaf5c107bfc" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.property
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    key character varying COLLATE pg_catalog."default" NOT NULL,
    value character varying COLLATE pg_catalog."default" NOT NULL,
    type character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.request
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "requestType" character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying COLLATE pg_catalog."default",
    file_id uuid,
    status text COLLATE pg_catalog."default",
    requested_by character varying COLLATE pg_catalog."default",
    CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."request-item-properties"
(
    "request-item-id" uuid NOT NULL,
    "property-id" uuid NOT NULL,
    CONSTRAINT "PK_a3c3bc0bd1428470511e7c8bc12" PRIMARY KEY ("request-item-id", "property-id")
);

CREATE TABLE IF NOT EXISTS public.request_item
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    quantity bigint,
    price double precision,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    sku character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_56dd6bc5f964de3ddbf8f75d63b" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.request_request_items
(
    request_item_id uuid NOT NULL,
    request_id uuid NOT NULL,
    CONSTRAINT "PK_511613c444759b7340fd58cc9f3" PRIMARY KEY (request_item_id, request_id)
);

CREATE TABLE IF NOT EXISTS public.role
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    division character varying COLLATE pg_catalog."default",
    name text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id),
    CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS public."user"
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    username character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default",
    "roleId" uuid,
    verified boolean NOT NULL DEFAULT false,
    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.verification_code
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    user_id uuid NOT NULL,
    code character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_d702c086da466e5d25974512d46" PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.procurement_user
    ADD CONSTRAINT "FK_8befb592fbbefbbd9b2a1249610" FOREIGN KEY ("roleId")
    REFERENCES public.role (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.request
    ADD CONSTRAINT "FK_ceb556b62d7a52cd8d689b4841b" FOREIGN KEY (file_id)
    REFERENCES public.file (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public."request-item-properties"
    ADD CONSTRAINT "FK_81f2e775196cfa29b6b811b4bd5" FOREIGN KEY ("request-item-id")
    REFERENCES public.request_item (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS "IDX_81f2e775196cfa29b6b811b4bd"
    ON public."request-item-properties"("request-item-id");


ALTER TABLE IF EXISTS public."request-item-properties"
    ADD CONSTRAINT "FK_a566c0efc1b32b5ff56b149408d" FOREIGN KEY ("property-id")
    REFERENCES public.property (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS "IDX_a566c0efc1b32b5ff56b149408"
    ON public."request-item-properties"("property-id");


ALTER TABLE IF EXISTS public.request_request_items
    ADD CONSTRAINT "FK_5a26be712c879d3cda39e40c525" FOREIGN KEY (request_id)
    REFERENCES public.request (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS "IDX_5a26be712c879d3cda39e40c52"
    ON public.request_request_items(request_id);


ALTER TABLE IF EXISTS public.request_request_items
    ADD CONSTRAINT "FK_e9f0e01483acc7b09abea3d227e" FOREIGN KEY (request_item_id)
    REFERENCES public.request_item (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS "IDX_e9f0e01483acc7b09abea3d227"
    ON public.request_request_items(request_item_id);


ALTER TABLE IF EXISTS public."user"
    ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId")
    REFERENCES public.role (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.verification_code
    ADD CONSTRAINT "FK_20dc9f8d86616620881be140833" FOREIGN KEY (user_id)
    REFERENCES public."user" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;

END;