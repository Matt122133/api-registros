import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  //el white list lo que hace es: lo que no esta incluido en los dto, lo elimina
  //y el forbidden, si hay propiedades en el objeto no requeridas retorna un bad request
  app.useGlobalPipes(
    new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true, })
  );

  //esto es necesario para que se cree la documentación de swagger
  const config = new DocumentBuilder()
    .setTitle('API-REGISTRO')
    .setDescription('Es una API para llevar el conteo de km realizados a tu auto. Podes ingresar cuando pasas por la estación y luego saber cuantas veces y cuanto has invertido.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);


}
bootstrap();
