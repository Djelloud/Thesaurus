let NORD = 0;
let SUD = 1;
let EST = 2;
let OUEST = 3;

function creerObj3DMurs(objgl, obj3DSol, intNoTexture, intNiveau) {
    const obj3DMurs = new Object();
    obj3DMurs.fltProfondeur = obj3DSol.fltProfondeur;
    obj3DMurs.fltLargeur = obj3DSol.fltLargeur;
    obj3DMurs.fltHauteur = 2;

    // Les trous
    obj3DMurs.tabAUntrou = new Array();
    for (let i = 0; i < 4; i++) 
        obj3DMurs.tabAUntrou.push(Math.random() < (25 - intNiveau) / 25);
    obj3DMurs.tabDebutRelTrou = new Array();
    for (let i = 0; i < 4; i++)
        obj3DMurs.tabDebutRelTrou.push(Math.random());
    obj3DMurs.fltLargeurTrou = 1.5 * (25 - intNiveau) / 25;
    obj3DMurs.fltHauteurTrou = 1;

    obj3DMurs.vertex = creerVertexMurs(objgl, obj3DMurs.fltLargeur, obj3DMurs.fltProfondeur, obj3DMurs.fltHauteur,
                                       obj3DMurs.tabAUntrou, obj3DMurs.tabDebutRelTrou, obj3DMurs.fltLargeurTrou, obj3DMurs.fltHauteurTrou);
    obj3DMurs.couleurs = creerCouleursMurs(objgl, [1, 1, 1, 1]);
    obj3DMurs.texels = creerTexelsMurs(objgl, obj3DMurs.fltLargeur, obj3DMurs.fltProfondeur, obj3DMurs.fltHauteur, intNoTexture,
                                        obj3DMurs.tabAUntrou, obj3DMurs.tabDebutRelTrou, obj3DMurs.fltLargeurTrou, obj3DMurs.fltHauteurTrou);
	obj3DMurs.maillage = creerMaillageMurs(objgl);
	
    obj3DMurs.transformations = creerTransformations();
    return obj3DMurs;
}

function creerVertexMurs(objgl, fltLargeur, fltProfondeur, fltHauteur, tabAUntrou, tabDebutRelTrou, fltLargeurTrou, fltHauteurTrou) {
    // Mur nord
    let tabVertex = [	          
             -fltLargeur / 2, fltHauteur, -fltProfondeur / 2,
             -fltLargeur / 2 + fltLargeur * tabDebutRelTrou[NORD], fltHauteur, -fltProfondeur / 2,
             -fltLargeur / 2 + fltLargeur * tabDebutRelTrou[NORD] + fltLargeurTrou, fltHauteur, -fltProfondeur / 2,
             fltLargeur / 2, fltHauteur, -fltProfondeur / 2,

             -fltLargeur / 2, 0, -fltProfondeur / 2,
             -fltLargeur / 2 + fltLargeur * tabDebutRelTrou[NORD], 0, -fltProfondeur / 2,
             -fltLargeur / 2 + fltLargeur * tabDebutRelTrou[NORD] + fltLargeurTrou, 0, -fltProfondeur / 2,
             fltLargeur / 2, 0, -fltProfondeur / 2
    ];
    
    if (tabAUntrou[NORD]) 
        tabVertex = tabVertex.concat([
             -fltLargeur / 2 + fltLargeur * tabDebutRelTrou[NORD], fltHauteurTrou, -fltProfondeur / 2,
             -fltLargeur / 2 + fltLargeur * tabDebutRelTrou[NORD] + fltLargeurTrou, fltHauteurTrou, -fltProfondeur / 2
 
        ]);
    else
        tabVertex = tabVertex.concat([
              -fltLargeur / 2 + fltLargeur * tabDebutRelTrou[NORD], 0, -fltProfondeur / 2,
              -fltLargeur / 2 + fltLargeur * tabDebutRelTrou[NORD] + fltLargeurTrou, 0, -fltProfondeur / 2
 
        ]);
   
    // Mur sud
    tabVertex = tabVertex.concat([
             fltLargeur / 2, fltHauteur, fltProfondeur / 2,
             fltLargeur / 2 - fltLargeur * tabDebutRelTrou[SUD], fltHauteur, fltProfondeur / 2,
             fltLargeur / 2 - fltLargeur * tabDebutRelTrou[SUD] - fltLargeurTrou, fltHauteur, fltProfondeur / 2,
             -fltLargeur / 2, fltHauteur, fltProfondeur / 2,

             fltLargeur / 2, 0, fltProfondeur / 2,
             fltLargeur / 2 - fltLargeur * tabDebutRelTrou[SUD], 0, fltProfondeur / 2,
             fltLargeur / 2 - fltLargeur * tabDebutRelTrou[SUD] - fltLargeurTrou, 0, fltProfondeur / 2,
             -fltLargeur / 2, 0, fltProfondeur / 2
    ]);

    if (tabAUntrou[SUD])
        tabVertex = tabVertex.concat([
             fltLargeur / 2 - fltLargeur * tabDebutRelTrou[SUD], fltHauteurTrou, fltProfondeur / 2,
             fltLargeur / 2 - fltLargeur * tabDebutRelTrou[SUD] - fltLargeurTrou, fltHauteurTrou, fltProfondeur / 2

        ]);
    else
        tabVertex = tabVertex.concat([
              fltLargeur / 2 - fltLargeur * tabDebutRelTrou[SUD], 0, fltProfondeur / 2,
              fltLargeur / 2 - fltLargeur * tabDebutRelTrou[SUD] - fltLargeurTrou, 0, fltProfondeur / 2

        ]);

    // Mur est
    tabVertex = tabVertex.concat([
             fltLargeur / 2, fltHauteur, -fltProfondeur / 2,
             fltLargeur / 2, fltHauteur, -fltProfondeur / 2 + fltProfondeur * tabDebutRelTrou[EST],
             fltLargeur / 2, fltHauteur, -fltProfondeur / 2 + fltProfondeur * tabDebutRelTrou[EST] + fltLargeurTrou,
             fltLargeur / 2, fltHauteur, fltProfondeur / 2,

             fltLargeur / 2, 0, -fltProfondeur / 2,
             fltLargeur / 2, 0, -fltProfondeur / 2 + fltProfondeur * tabDebutRelTrou[EST],
             fltLargeur / 2, 0, -fltProfondeur / 2 + fltProfondeur * tabDebutRelTrou[EST] + fltLargeurTrou,
             fltLargeur / 2, 0, fltProfondeur / 2
   ]);

    if (tabAUntrou[EST])
        tabVertex = tabVertex.concat([
             fltLargeur / 2, fltHauteurTrou, -fltProfondeur / 2 + fltProfondeur * tabDebutRelTrou[EST],
             fltLargeur / 2, fltHauteurTrou, -fltProfondeur / 2 + fltProfondeur * tabDebutRelTrou[EST] + fltLargeurTrou,
        ]);
    else
        tabVertex = tabVertex.concat([
             fltLargeur / 2, 0, -fltProfondeur / 2 + fltProfondeur * tabDebutRelTrou[EST],
             fltLargeur / 2, 0, -fltProfondeur / 2 + fltProfondeur * tabDebutRelTrou[EST] + fltLargeurTrou,

        ]);


    // Mur ouest
    tabVertex = tabVertex.concat([
             -fltLargeur / 2, fltHauteur, fltProfondeur / 2,
             -fltLargeur / 2, fltHauteur, fltProfondeur / 2 - fltProfondeur * tabDebutRelTrou[OUEST],
             -fltLargeur / 2, fltHauteur, fltProfondeur / 2 - fltProfondeur * tabDebutRelTrou[OUEST] - fltLargeurTrou,
             -fltLargeur / 2, fltHauteur, -fltProfondeur / 2,

             -fltLargeur / 2, 0, fltProfondeur / 2,
             -fltLargeur / 2, 0, fltProfondeur / 2 - fltProfondeur * tabDebutRelTrou[OUEST],
             -fltLargeur / 2, 0, fltProfondeur / 2 - fltProfondeur * tabDebutRelTrou[OUEST] - fltLargeurTrou,
             -fltLargeur / 2, 0, -fltProfondeur / 2
    ]);

    if (tabAUntrou[OUEST])
        tabVertex = tabVertex.concat([
             -fltLargeur / 2, fltHauteurTrou, fltProfondeur / 2 - fltProfondeur * tabDebutRelTrou[OUEST],
             -fltLargeur / 2, fltHauteurTrou, fltProfondeur / 2 - fltProfondeur * tabDebutRelTrou[OUEST] - fltLargeurTrou,
        ]);
    else
        tabVertex = tabVertex.concat([
             -fltLargeur / 2, 0, fltProfondeur / 2 - fltProfondeur * tabDebutRelTrou[OUEST],
             -fltLargeur / 2, 0, fltProfondeur / 2 - fltProfondeur * tabDebutRelTrou[OUEST] - fltLargeurTrou,

        ]);
		
    const objMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
   
    return objMurs;
}

function creerCouleursMurs(objgl, tabCouleur) {
    let tabCouleurs = []; 
    for (let i = 0; i < 40; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    const objCouleursMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);
    
    return objCouleursMurs;
}

function creerTexelsMurs(objgl, fltLargeur, fltProfondeur, fltHauteur, intNoTexture, tabAUntrou, tabDebutRelTrou, fltLargeurTrou, fltHauteurTrou) {
    // Mur nord
     let tabTexels = [
             0.0, 0.0,
             fltLargeur * tabDebutRelTrou[NORD], 0.0,
             fltLargeur * tabDebutRelTrou[NORD] + fltLargeurTrou, 0.0,
             fltLargeur, 0.0,

             0.0, fltHauteur,
             fltLargeur * tabDebutRelTrou[NORD],  fltHauteur,
             fltLargeur * tabDebutRelTrou[NORD] + fltLargeurTrou, fltHauteur,
             fltLargeur, fltHauteur
     ];

     if (tabAUntrou[NORD])
         tabTexels = tabTexels.concat([
             fltLargeur * tabDebutRelTrou[NORD], fltHauteur - fltHauteurTrou,
             fltLargeur * tabDebutRelTrou[NORD] + fltLargeurTrou, fltHauteur - fltHauteurTrou
         ]);
     else
         tabTexels = tabTexels.concat([
             fltLargeur * tabDebutRelTrou[NORD], fltHauteur,
             fltLargeur * tabDebutRelTrou[NORD] + fltLargeurTrou, fltHauteur
         ]);

    // Mur sud
     tabTexels = tabTexels.concat([
              0.0, 0.0,
              fltLargeur * tabDebutRelTrou[SUD], 0.0,
              fltLargeur * tabDebutRelTrou[SUD] + fltLargeurTrou, 0.0,
              fltLargeur, 0.0,

              0.0, fltHauteur,
              fltLargeur * tabDebutRelTrou[SUD], fltHauteur,
              fltLargeur * tabDebutRelTrou[SUD] + fltLargeurTrou, fltHauteur,
              fltLargeur, fltHauteur
     ]);

     if (tabAUntrou[SUD])
         tabTexels = tabTexels.concat([
             fltLargeur * tabDebutRelTrou[SUD], fltHauteur - fltHauteurTrou,
             fltLargeur * tabDebutRelTrou[SUD] + fltLargeurTrou, fltHauteur - fltHauteurTrou
         ]);
     else
         tabTexels = tabTexels.concat([
             fltLargeur * tabDebutRelTrou[SUD], fltHauteur,
             fltLargeur * tabDebutRelTrou[SUD] + fltLargeurTrou, fltHauteur
         ]);

    // Mur est
     tabTexels = tabTexels.concat([
              0.0, 0.0,
              fltProfondeur * tabDebutRelTrou[EST], 0.0,
              fltProfondeur * tabDebutRelTrou[EST] + fltLargeurTrou, 0.0,
              fltProfondeur, 0.0,

              0.0, fltHauteur,
              fltProfondeur * tabDebutRelTrou[EST], fltHauteur,
              fltProfondeur * tabDebutRelTrou[EST] + fltLargeurTrou, fltHauteur,
              fltProfondeur, fltHauteur
     ]);

     if (tabAUntrou[EST])
         tabTexels = tabTexels.concat([
             fltProfondeur * tabDebutRelTrou[EST], fltHauteur - fltHauteurTrou,
             fltProfondeur * tabDebutRelTrou[EST] + fltLargeurTrou, fltHauteur - fltHauteurTrou
         ]);
     else
         tabTexels = tabTexels.concat([
             fltProfondeur * tabDebutRelTrou[EST], fltHauteur,
             fltProfondeur * tabDebutRelTrou[EST] + fltLargeurTrou, fltHauteur
         ]);

    // Mur ouest
     tabTexels = tabTexels.concat([
              0.0, 0.0,
              fltProfondeur * tabDebutRelTrou[OUEST], 0.0,
              fltProfondeur * tabDebutRelTrou[OUEST] + fltLargeurTrou, 0.0,
              fltProfondeur, 0.0,

              0.0, fltHauteur,
              fltProfondeur * tabDebutRelTrou[OUEST], fltHauteur,
              fltProfondeur * tabDebutRelTrou[OUEST] + fltLargeurTrou, fltHauteur,
              fltProfondeur, fltHauteur
     ]);

     if (tabAUntrou[OUEST])
         tabTexels = tabTexels.concat([
             fltProfondeur * tabDebutRelTrou[OUEST], fltHauteur - fltHauteurTrou,
             fltProfondeur * tabDebutRelTrou[OUEST] + fltLargeurTrou, fltHauteur - fltHauteurTrou
         ]);
     else
         tabTexels = tabTexels.concat([
             fltProfondeur * tabDebutRelTrou[OUEST], fltHauteur,
             fltProfondeur * tabDebutRelTrou[OUEST] + fltLargeurTrou, fltHauteur
         ]);
    
    const objTexelsMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);
   
    objTexelsMurs.intNoTexture = intNoTexture; objTexelsMurs.pcCouleurTexel = 1.0;
    
    return objTexelsMurs;
  }

function creerMaillageMurs(objgl) {
       const tabMaillage =
            [ // Les 6 triangles du mur nord
             0, 1, 4,
             1, 4, 5,
			 1, 2, 8,
             2, 8, 9,
			 2, 3, 6,
             3, 6, 7,
             // Les 6 triangles du mur sud
             10, 11, 14,
             11, 14, 15,
			 11, 12, 18,
             12, 18, 19,
			 12, 13, 16,
             13, 16, 17,
             // Les 6 triangles du mur est
             20, 21, 24,
             21, 24, 25,
			 21, 22, 28,
             22, 28, 29,
			 22, 23, 26,
             23, 26, 27,
             // Les 6 triangles du mur est
             30, 31, 34,
             31, 34, 35,
			 31, 32, 38,
             32, 38, 39,
			 32, 33, 36,
             33, 36, 37
            ];

	    const objMaillageMurs = objgl.createBuffer();
        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageMurs);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

        // Le nombre de triangles
        objMaillageMurs.intNbTriangles = 24;
        // Le nombre de droites
        objMaillageMurs.intNbDroites = 0;
		
        return objMaillageMurs;
    }
  
  
