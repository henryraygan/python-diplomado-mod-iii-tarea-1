const Persona = {
  name: "Antonio",
  edad: 31,
  single: false,
  carrers: [
    {
      name: "Abogado",
      degree: "Licenciado",
      year: 2019,
    },
    {
      name: "Web Developer",
      degree: "Certificate Degree",
      year: 2023,
    },
  ],
};

const key_selected = "carrers";
console.log(key_selected);
console.log(Persona["name"] + " es " + Persona[key_selected][0]);

Persona["color_favorite"] = "red";

console.log(Persona);

arreglo = [1, 2, 3];
arreglo[1]; // => 2
