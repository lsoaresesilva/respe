import StringSimilarity from "./stringSimilarity";

describe("Testes do cálculo de similaridade entre strings", ()=>{
    it("Deve retornar 1, pois as strings são idênticas", ()=>{
       let stringA = "casa";
       let stringB = "casa";
       expect(StringSimilarity.check(stringA, stringB)).toEqual(1);
    })

    it("Deve retornar 0, pois as strings são totalmente diferentes", ()=>{
        let stringA = "abc";
        let stringB = "xyz";
        expect(StringSimilarity.check(stringA, stringB)).toEqual(0);
     })

     it("Deve retornar 0.75, pois as strings são similares", ()=>{
        let stringA = "casa";
        let stringB = "caza";
        expect(StringSimilarity.check(stringA, stringB)).toEqual(0.75);
     })

})