// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import 'jest-extended';
import supertest from 'supertest';
import app from '../../src/app';
import { jeuRoutes } from "../../src/routes/jeuRouter";

const request = supertest(app);

const testNom1 = 'Aimen';
const testNom2 = 'Pierre';

beforeAll(async ()=> {
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom1 });
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom2 });
})

/*describe('redemarrerJeu.test.ts', () => {
  it("devrait implémenter test", async () => {
    throw new Error("Ce test n'a pas été défini")
  });
});*/

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  it(`devrait redémarrer le jeu avec succès`, async () => {
      const response = await request.get('/api/v1/jeu/redemarrerJeu');
      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
  });

  it('devrait rendre 0 pour le nombre de Joueurs', async () => {
    const joueursJSON = jeuRoutes.controleurJeu.joueurs;
    const joueursArray = JSON.parse(joueursJSON);
    expect(joueursArray.length).toBe(0);
  });

  it("devrait retourner 404 quand on essaie de jouer après un redémarrage", async () => {
    await request.get('/api/v1/jeu/redemarrerJeu');
    const response = await request.get(`/api/v1/jeu/jouer/${testNom1}`);
    expect(response.status).toBe(404);
  });
});
