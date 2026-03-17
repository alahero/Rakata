# Instrucciones de commit y sincronización

## Repositorios

- **Alahero (origin):** https://github.com/Alahero/Rakata.git  
- **Mandala Group (mandala):** https://github.com/MandalaGroup/rakata.git  

## Reglas

1. **Alahero (origin)**  
   - El commit en el repo de Alahero debe hacerse **siempre en la rama `main`**.

2. **Mandala Group (mandala)**  
   - El repo de Mandala suele tener **varias ramas**.  
   - **Antes de hacer push a Mandala:** revisar las ramas disponibles (`git fetch mandala` y `git branch -r`) y **preguntar al usuario en qué rama debe subirse el commit**.  
   - Solo después de que el usuario indique la rama, hacer push a esa rama en `mandala`.

## Flujo recomendado

1. Hacer commit local con mensaje descriptivo (en español de México).  
2. Hacer push a **origin** en `main` (sincronizar con Alahero).  
3. Hacer fetch de **mandala** y listar ramas remotas.  
4. Preguntar: *¿En qué rama de Mandala debe subirse este commit?*  
5. Hacer push a **mandala** en la rama indicada por el usuario.
