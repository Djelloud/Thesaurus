// NextLevel.js

// let NORD = 0;
// let SUD = 1;
// let EST = 2;
// let OUEST = 3;

function creerObj3DNextLevel(objgl, obj3DTunnels, intNoTexture) {
    const obj3DNextLevel = new Object();
    obj3DNextLevel.fltProfondeur = obj3DTunnels.fltProfondeur; // La profondeur du tunnel
    obj3DNextLevel.fltLargeur = obj3DTunnels.fltLargeur; // La largeur de l'image
    obj3DNextLevel.fltHauteur = obj3DTunnels.fltHauteur; // La hauteur de l'image
    obj3DNextLevel.tabDebutX = obj3DTunnels.tabDebutX;
    obj3DNextLevel.tabDebutZ = obj3DTunnels.tabDebutZ;
    
    // Cr�er les NextLevel
    obj3DNextLevel.vertex = creerVertexNextLevel(objgl, obj3DNextLevel.tabDebutX, obj3DNextLevel.tabDebutZ,
                                                obj3DNextLevel.fltLargeur, obj3DNextLevel.fltProfondeur, obj3DNextLevel.fltHauteur);
    obj3DNextLevel.couleurs = creerCouleursNextLevel(objgl, [0, 0, 0, 1]);
    obj3DNextLevel.texels = creerTexelsNextLevel(objgl, intNoTexture);
    obj3DNextLevel.maillage = creerMaillageNextLevel(objgl);
	
    obj3DNextLevel.transformations = creerTransformations();
    return obj3DNextLevel;
}

function creerVertexNextLevel(objgl, tabDebutX, tabDebutZ, fltLargeur, fltProfondeur, fltHauteur) {
    
    const tabVertex = [
            // Image du tunnel nord
            tabDebutX[NORD], fltHauteur, tabDebutZ[NORD] - fltProfondeur,
            tabDebutX[NORD] + fltLargeur, fltHauteur, tabDebutZ[NORD] - fltProfondeur,
            tabDebutX[NORD], 0, tabDebutZ[NORD] - fltProfondeur,
            tabDebutX[NORD] + fltLargeur, 0, tabDebutZ[NORD] - fltProfondeur,
            
            // Image du tunnel sud
            tabDebutX[SUD], fltHauteur, tabDebutZ[SUD] + fltProfondeur,
            tabDebutX[SUD] - fltLargeur, fltHauteur, tabDebutZ[SUD] + fltProfondeur,
            tabDebutX[SUD], 0, tabDebutZ[SUD] + fltProfondeur,
            tabDebutX[SUD] - fltLargeur, 0, tabDebutZ[SUD] + fltProfondeur,
            
             // Image du tunnel est
            tabDebutX[EST] + fltProfondeur, fltHauteur, tabDebutZ[EST],
            tabDebutX[EST] + fltProfondeur, fltHauteur, tabDebutZ[EST] + fltLargeur,
            tabDebutX[EST] + fltProfondeur, 0, tabDebutZ[EST],
            tabDebutX[EST] + fltProfondeur, 0, tabDebutZ[EST] + fltLargeur,

            // Image du tunnel ouest
            tabDebutX[OUEST] - fltProfondeur, fltHauteur, tabDebutZ[OUEST],
            tabDebutX[OUEST] - fltProfondeur, fltHauteur, tabDebutZ[OUEST] - fltLargeur,
            tabDebutX[OUEST] - fltProfondeur, 0, tabDebutZ[OUEST],
            tabDebutX[OUEST] - fltProfondeur, 0, tabDebutZ[OUEST] - fltLargeur
    ];

    const objNextLevel = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objNextLevel);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objNextLevel;
}

function creerCouleursNextLevel(objgl, tabCouleur) {
    let tabCouleurs = []; 
    for (let i = 0; i < 16; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    const objCouleursNextLevel = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursNextLevel);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursNextLevel;
}

function creerTexelsNextLevel(objgl, intNoTexture) {
    const tabTexels = [
            // NORD
             0, 0,
             1, 0,
             0, 1,
             1, 1,
             
             // SUD
             0, 0,
             1, 0,
             0, 1,
             1, 1,

             // EST
             0, 0,
             1, 0,
             0, 1,
             1, 1,

              // OUEST
             0, 0,
             1, 0,
             0, 1,
             1, 1
     ];

    const objTexelsNextLevel = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsNextLevel);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsNextLevel.intNoTexture = intNoTexture; objTexelsNextLevel.pcCouleurTexel = 1.0;
    
    return objTexelsNextLevel;
  }

function creerMaillageNextLevel(objgl) {
       const tabMaillage =
            [ // NORD
             0, 1, 2,
             1, 2, 3,
             // SUD
             4, 5, 6,
             5, 6, 7,
            // EST
             8, 9, 10,
             9, 10, 11,
             // OUEST
             12, 13, 14,
             13, 14, 15 
            ];

	    const objMaillageNextLevel = objgl.createBuffer();
        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageNextLevel);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

        // Le nombre de triangles
        objMaillageNextLevel.intNbTriangles = 8;
        // Le nombre de droites
        objMaillageNextLevel.intNbDroites = 0;
		
        return objMaillageNextLevel;
    }
  
  
