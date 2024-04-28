/** @param {NS} ns **/
export async function main(ns) {
  const corpName = "MyCorp";
  const allCities = ["Sector-12", "Aevum", "Chongqing", "New Tokyo", "Ishima", "Volhaven"]; // Lista städer där divisionen ska finnas
  // Initialisera företaget om det inte redan finns
  if (!ns.corporation.hasCorporation()) {
    ns.corporation.createCorporation(corpName, false);
  }

  // Hantera olika aspekter av företaget
  while (true) {
    const corporation = ns.corporation.getCorporation();

    // Skapa divisioner om nödvändigt
    await manageDivisions(ns, allCities);
    await initialCorpUpgrade(ns);

    // Hantera varje division
    for (const division of corporation.divisions) {
      await manageWarehouse(ns, division);
      await manageEmployees(ns, division);
      await manageProducts(ns, division);
      await manageResearch(ns, division);
      await manageAdvertising(ns, division);
    }

    // Vänta en stund innan nästa iteration
    await ns.sleep(10000); // Vänta 10 sekunder
  }
}

async function manageDivisions(ns, allCities) {
  const divisionName = "Agriculture";
  const divisionType = "Agriculture";
  // Kontrollera om divisionen redan finns
  const corporation = ns.corporation.getCorporation();
  const existingDivisions = corporation.divisions;

  if (!existingDivisions.includes(divisionName)) {
    ns.corporation.createDivision(divisionName, divisionType);
  }

  const division = ns.corporation.getDivision(divisionName);
  for (const city of allCities) {
    if (!division.cities.includes(city)) {
      ns.corporation.expandCity(divisionName, city);
      ns.print(`Expanded ${divisionName} division to ${city}.`);
    }
  }
  // Fortsätt med ytterligare logik efter behov
}

async function manageWarehouse(ns, division, allCities) {
        for (const city of allCities) {
        if (!ns.corporation.hasWarehouse(division, city)) {
            ns.corporation.purchaseWarehouse(division, city);
            ns.print(`Purchased warehouse in ${city} for division ${division}.`);
        }
    }
}

async function manageEmployees(ns, division) {
  // Lägg till logik för att anställa, träna och tilldela jobb till anställda här
}

async function manageProducts(ns, division) {
  // Lägg till logik för att utveckla, producera och sälja produkter här
}

async function manageResearch(ns, division) {
  // Lägg till logik för att bedriva forskning och utveckling här
}

async function manageAdvertising(ns, division) {
  // Lägg till logik för reklam och marknadsföring här
}

async function initialCorpUpgrade(ns) {

  if (!ns.corporation.hasUnlock("Smart Supply")) {
    ns.corporation.purchaseUnlock("Smart Supply");
  }

  if (ns.corporation.getUpgradeLevel("Smart Storage") < 4) {
    ns.corporation.levelUpgrade("Smart Storage");
  }

  if (ns.corporation.getUpgradeLevel("DreamSense") < 1) {
    ns.corporation.levelUpgrade("DreamSense");
  }
  // upgrade employee stats
  if (ns.corporation.getUpgradeLevel("Nuoptimal Nootropic Injector Implants") < 2) {
    ns.corporation.levelUpgrade("Nuoptimal Nootropic Injector Implants");
  }

  if (ns.corporation.getUpgradeLevel("Speech Processor Implants") < 2) {
    ns.corporation.levelUpgrade("Speech Processor Implants");
  }

  if (ns.corporation.getUpgradeLevel("Neural Accelerators") < 2) {
    ns.corporation.levelUpgrade("Neural Accelerators");
  }
  
  if (ns.corporation.getUpgradeLevel("FocusWires") < 2) {
   ns.corporation.levelUpgrade("FocusWires");
  }
  
}
