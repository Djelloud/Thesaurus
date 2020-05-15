// Tunnels.js

// let NORD = 0;
// let SUD = 1;
// let EST = 2;
// let OUEST = 3;

function creerObj3DTunnels(objgl, obj3DMurs, intNoTexture) {

    const obj3DTunnels = new Object();
    obj3DTunnels.fltProfondeur = 4; // La profondeur d'un seul tunnel
    obj3DTunnels.fltLargeur = obj3DMurs.fltLargeurTrou; // La largeur d'un seul tunnel
    obj3DTunnels.fltHauteur = obj3DMurs.fltHauteurTrou; // La hauteur d'un seul tunnel

    obj3DTunnels.tabDebutX = [-obj3DMurs.fltLargeur / 2 + obj3DMurs.fltLargeur * obj3DMurs.tabDebutRelTrou[NORD],
                             obj3DMurs.fltLargeur / 2 - obj3DMurs.fltLargeur * obj3DMurs.tabDebutRelTrou[SUD],
                             obj3DMurs.fltLargeur / 2,
                             -obj3DMurs.fltLargeur / 2
                            ];

    obj3DTunnels.tabDebutZ = [-obj3DMurs.fltProfondeur / 2,
                              obj3DMurs.fltProfondeur / 2,
                              -obj3DMurs.fltProfondeur / 2 + obj3DMurs.fltProfondeur * obj3DMurs.tabDebutRelTrou[EST],
                              obj3DMurs.fltProfondeur / 2 - obj3DMurs.fltProfondeur * obj3DMurs.tabDebutRelTrou[OUEST]
                            ];
 
    // Cr�er les tunnels
    obj3DTunnels.vertex = creerVertexTunnels(objgl, obj3DTunnels.tabDebutX, obj3DTunnels.tabDebutZ,
                                             obj3DTunnels.fltLargeur, obj3DTunnels.fltProfondeur, obj3DTunnels.fltHauteur);
    obj3DTunnels.couleurs = creerCouleursTunnels(objgl, [0, 0, 0, 1]);
    obj3DTunnels.texels = creerTexelsTunnels(objgl, obj3DTunnels.fltLargeur, obj3DTunnels.fltProfondeur, obj3DTunnels.fltHauteur, intNoTexture);
    obj3DTunnels.maillage = creerMaillageTunnels(objgl);
	
    obj3DTunnels.transformations = creerTransformations();
    return obj3DTunnels;
}

function creerVertexTunnels(objgl, tabDebutX, tabDebutZ, fltLargeur, fltProfondeur, fltHauteur) {
    // Tunnel nord
    let tabVertex = [	          
            tabDebutX[NORD], fltHauteur, tabDebutZ[NORD],
            tabDebutX[NORD] + fltLargeur, fltHauteur, tabDebutZ[NORD],
            tabDebutX[NORD], 0, tabDebutZ[NORD],
            tabDebutX[NORD] + fltLargeur, 0, tabDebutZ[NORD],

            tabDebutX[NORD], fltHauteur, tabDebutZ[NORD] - fltProfondeur,
            tabDebutX[NORD] + fltLargeur, fltHauteur, tabDebutZ[NORD] - fltProfondeur,
            tabDebutX[NORD], 0, tabDebutZ[NORD] - fltProfondeur,
            tabDebutX[NORD] + fltLargeur, 0, tabDebutZ[NORD] - fltProfondeur,

            tabDebutX[NORD], fltHauteur, tabDebutZ[NORD],
            tabDebutX[NORD] + fltLargeur, fltHauteur, tabDebutZ[NORD],
            tabDebutX[NORD], 0, tabDebutZ[NORD],
            tabDebutX[NORD] + fltLargeur, 0, tabDebutZ[NORD],

            tabDebutX[NORD], fltHauteur, tabDebutZ[NORD] - fltProfondeur,
            tabDebutX[NORD] + fltLargeur, fltHauteur, tabDebutZ[NORD] - fltProfondeur,
            tabDebutX[NORD], 0, tabDebutZ[NORD] - fltProfondeur,
            tabDebutX[NORD] + fltLargeur, 0, tabDebutZ[NORD] - fltProfondeur
    ];

    // Tunnel sud
    tabVertex = tabVertex.concat([
            tabDebutX[SUD], fltHauteur, tabDebutZ[SUD],
            tabDebutX[SUD] - fltLargeur, fltHauteur, tabDebutZ[SUD],
            tabDebutX[SUD], 0, tabDebutZ[SUD],
            tabDebutX[SUD] - fltLargeur, 0, tabDebutZ[SUD],

            tabDebutX[SUD], fltHauteur, tabDebutZ[SUD] + fltProfondeur,
            tabDebutX[SUD] - fltLargeur, fltHauteur, tabDebutZ[SUD] + fltProfondeur,
            tabDebutX[SUD], 0, tabDebutZ[SUD] + fltProfondeur,
            tabDebutX[SUD] - fltLargeur, 0, tabDebutZ[SUD] + fltProfondeur,

            tabDebutX[SUD], fltHauteur, tabDebutZ[SUD],
            tabDebutX[SUD] - fltLargeur, fltHauteur, tabDebutZ[SUD],
            tabDebutX[SUD], 0, tabDebutZ[SUD],
            tabDebutX[SUD] - fltLargeur, 0, tabDebutZ[SUD],

            tabDebutX[SUD], fltHauteur, tabDebutZ[SUD] + fltProfondeur,
            tabDebutX[SUD] - fltLargeur, fltHauteur, tabDebutZ[SUD] + fltProfondeur,
            tabDebutX[SUD], 0, tabDebutZ[SUD] + fltProfondeur,
            tabDebutX[SUD] - fltLargeur, 0, tabDebutZ[SUD] + fltProfondeur
    ]);

    // Tunnel est 
    tabVertex = tabVertex.concat([
         tabDebutX[EST], fltHauteur, tabDebutZ[EST],
         tabDebutX[EST], fltHauteur, tabDebutZ[EST] + fltLargeur,
         tabDebutX[EST], 0, tabDebutZ[EST],
         tabDebutX[EST], 0, tabDebutZ[EST] + fltLargeur,

         tabDebutX[EST] + fltProfondeur, fltHauteur, tabDebutZ[EST],
         tabDebutX[EST] + fltProfondeur, fltHauteur, tabDebutZ[EST] + fltLargeur,
         tabDebutX[EST] + fltProfondeur, 0, tabDebutZ[EST],
         tabDebutX[EST] + fltProfondeur, 0, tabDebutZ[EST] + fltLargeur,

         tabDebutX[EST], fltHauteur, tabDebutZ[EST],
         tabDebutX[EST], fltHauteur, tabDebutZ[EST] + fltLargeur,
         tabDebutX[EST], 0, tabDebutZ[EST],
         tabDebutX[EST], 0, tabDebutZ[EST] + fltLargeur,

         tabDebutX[EST] + fltProfondeur, fltHauteur, tabDebutZ[EST],
         tabDebutX[EST] + fltProfondeur, fltHauteur, tabDebutZ[EST] + fltLargeur,
         tabDebutX[EST] + fltProfondeur, 0, tabDebutZ[EST],
         tabDebutX[EST] + fltProfondeur, 0, tabDebutZ[EST] + fltLargeur
    ]);

    // Tunnel ouest 
    tabVertex = tabVertex.concat([
          tabDebutX[OUEST], fltHauteur, tabDebutZ[OUEST],
          tabDebutX[OUEST], fltHauteur, tabDebutZ[OUEST] - fltLargeur,
          tabDebutX[OUEST], 0, tabDebutZ[OUEST],
          tabDebutX[OUEST], 0, tabDebutZ[OUEST] - fltLargeur,

          tabDebutX[OUEST] - fltProfondeur, fltHauteur, tabDebutZ[OUEST],
          tabDebutX[OUEST] - fltProfondeur, fltHauteur, tabDebutZ[OUEST] - fltLargeur,
          tabDebutX[OUEST] - fltProfondeur, 0, tabDebutZ[OUEST],
          tabDebutX[OUEST] - fltProfondeur, 0, tabDebutZ[OUEST] - fltLargeur,

          tabDebutX[OUEST], fltHauteur, tabDebutZ[OUEST],
          tabDebutX[OUEST], fltHauteur, tabDebutZ[OUEST] - fltLargeur,
          tabDebutX[OUEST], 0, tabDebutZ[OUEST],
          tabDebutX[OUEST], 0, tabDebutZ[OUEST] - fltLargeur,

          tabDebutX[OUEST] - fltProfondeur, fltHauteur, tabDebutZ[OUEST],
          tabDebutX[OUEST] - fltProfondeur, fltHauteur, tabDebutZ[OUEST] - fltLargeur,
          tabDebutX[OUEST] - fltProfondeur, 0, tabDebutZ[OUEST],
          tabDebutX[OUEST] - fltProfondeur, 0, tabDebutZ[OUEST] - fltLargeur,
    ]);

    const objTunnels = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTunnels);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objTunnels;
}

function creerCouleursTunnels(objgl, tabCouleur) {
    let tabCouleurs = []; 
    for (let i = 0; i < 64; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    const objCouleursTunnels = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursTunnels);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursTunnels;
}

function creerTexelsTunnels(objgl, fltLargeur, fltProfondeur, fltHauteur, intNoTexture) {
    // Tunnel nord
    let tabTexels = [
             0, 0,
             0, 0,
             0, fltHauteur,
             0, fltHauteur,
             fltProfondeur, 0, 
             fltProfondeur, 0,
             fltProfondeur, fltHauteur,
             fltProfondeur, fltHauteur,

             0, 0,
             0, fltLargeur,
             0, 0,
             0, fltLargeur,
             fltProfondeur, 0,
             fltProfondeur, fltLargeur,
             fltProfondeur, 0,
             fltProfondeur, fltLargeur
     ];
     // Tunnel sud (m�me chose que tunnel nord)
     tabTexels = tabTexels.concat(tabTexels);

     // Tunnel est-ouest (m�me chose que tunnel nord-sud)
     tabTexels = tabTexels.concat(tabTexels);

    const objTexelsTunnels = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsTunnels);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsTunnels.intNoTexture = intNoTexture; objTexelsTunnels.pcCouleurTexel = 0.5;
    
    return objTexelsTunnels;
  }

function creerMaillageTunnels(objgl) {
       const tabMaillage =
            [ // Les 8 triangles du tunnel nord
             0, 4, 2,
             4, 2, 6,
             1, 5, 3,
             5, 3, 7,          
             8, 9, 12,
             9, 12, 13,
             10, 11, 14,
             11, 14, 15,

             // Les 8 triangles du tunnel sud
             16, 20, 18,
             20, 18, 22,
             17, 21, 19,
             21, 19, 23,
             24, 25, 28,
             25, 28, 29,
             26, 27, 30,
             27, 30, 31,

             // Les 8 triangles du tunnel est
             32, 36, 34,
             36, 34, 38,
             33, 37, 35,
             37, 35, 39,
             40, 41, 44,
             41, 44, 45,
             42, 43, 46,
             43, 46, 47,

             // Les 8 triangles du tunnel ouest
             48, 52, 50,
             52, 50, 54,
             49, 53, 51,
             53, 51, 55,
             56, 57, 60,
             57, 60, 61,
             58, 59, 62,
             59, 62, 63
            ];

	    const objMaillageTunnels = objgl.createBuffer();
        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageTunnels);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

        // Le nombre de triangles
        objMaillageTunnels.intNbTriangles = 32;
        // Le nombre de droites
        objMaillageTunnels.intNbDroites = 0;
		
        return objMaillageTunnels;
    }
  
  
