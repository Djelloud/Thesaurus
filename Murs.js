
function creerObj3DMurs(objgl, obj3DSol, intNoTexture) {
    const obj3DMurs = new Object();
    obj3DMurs.fltProfondeur = obj3DSol.fltProfondeur;
    obj3DMurs.fltLargeur = obj3DSol.fltLargeur;
    obj3DMurs.fltHauteur = 2;

    obj3DMurs.vertex = creerVertexMurs(objgl, obj3DMurs.fltLargeur, obj3DMurs.fltProfondeur, obj3DMurs.fltHauteur);
    obj3DMurs.couleurs = creerCouleursMurs(objgl, [1, 1, 1, 1]);
    obj3DMurs.texels = creerTexelsMurs(objgl, obj3DMurs.fltLargeur, obj3DMurs.fltProfondeur, obj3DMurs.fltHauteur, intNoTexture);
    obj3DMurs.maillage = creerMaillageMurs(objgl);

    obj3DMurs.transformations = creerTransformations();
    return obj3DMurs;
}

function creerVertexMurs(objgl, fltLargeur, fltProfondeur, fltHauteur) {
    const tabVertex = [
        // Mur nord
        -fltLargeur / 2, fltHauteur, -fltProfondeur / 2,
        fltLargeur / 2, fltHauteur, -fltProfondeur / 2,
        -fltLargeur / 2, 0, -fltProfondeur / 2,
        fltLargeur / 2, 0, -fltProfondeur / 2,
        // Mur sud
        fltLargeur / 2, fltHauteur, fltProfondeur / 2,
        -fltLargeur / 2, fltHauteur, fltProfondeur / 2,
        fltLargeur / 2, 0, fltProfondeur / 2,
        -fltLargeur / 2, 0, fltProfondeur / 2,
        // Mur est
        fltLargeur / 2, fltHauteur, -fltProfondeur / 2,
        fltLargeur / 2, fltHauteur, fltProfondeur / 2,
        fltLargeur / 2, 0, -fltProfondeur / 2,
        fltLargeur / 2, 0, fltProfondeur / 2,
        // Mur ouest
        -fltLargeur / 2, fltHauteur, fltProfondeur / 2,
        -fltLargeur / 2, fltHauteur, -fltProfondeur / 2,
        -fltLargeur / 2, 0, fltProfondeur / 2,
        -fltLargeur / 2, 0, -fltProfondeur / 2
    ];

    const objMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objMurs;
}

function creerCouleursMurs(objgl, tabCouleur) {
    tabCouleurs = [];
    for (let i = 0; i < 16; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    const objCouleursMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursMurs;
}

function creerTexelsMurs(objgl, fltLargeur, fltProfondeur, fltHauteur, intNoTexture) {
    const tabTexels = [
        // Mur nord
        0.0, 0.0,
        fltLargeur, 0.0,
        0.0, fltHauteur,
        fltLargeur, fltHauteur,
        // Mur sud			 
        0.0, 0.0,
        fltLargeur, 0.0,
        0.0, fltHauteur,
        fltLargeur, fltHauteur,
        // Mur est			 
        0.0, 0.0,
        fltProfondeur, 0.0,
        0.0, fltHauteur,
        fltProfondeur, fltHauteur,
        // Mur ouest			 
        0.0, 0.0,
        fltProfondeur, 0.0,
        0.0, fltHauteur,
        fltProfondeur, fltHauteur
    ];

    const objTexelsMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsMurs.intNoTexture = intNoTexture; objTexelsMurs.pcCouleurTexel = 1.0;

    return objTexelsMurs;
}

function creerMaillageMurs(objgl) {
    const tabMaillage =
        [ // Les 2 triangles du mur nord
            0, 1, 2,
            1, 2, 3,
            // Les 2 triangles du mur sud
            4, 5, 6,
            5, 6, 7,
            // Les 2 triangles du mur est
            8, 9, 10,
            9, 10, 11,
            // Les 2 triangles du mur ouest
            12, 13, 14,
            13, 14, 15
        ];

    const objMaillageMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageMurs);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageMurs.intNbTriangles = 8;
    // Le nombre de droites
    objMaillageMurs.intNbDroites = 0;

    return objMaillageMurs;
}


