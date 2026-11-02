-- CreateTable
CREATE TABLE "facturas_pedido" (
    "id" SERIAL NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "nombre_archivo" TEXT NOT NULL,
    "contenido" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "facturas_pedido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "facturas_pedido_pedido_id_key" ON "facturas_pedido"("pedido_id");

-- AddForeignKey
ALTER TABLE "facturas_pedido" ADD CONSTRAINT "facturas_pedido_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
