using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameGrid : MonoBehaviour {
    public LineRenderer lr;
    public int xCells, yCells;
	// Use this for initialization
	void Start () {
        lr = GetComponent<LineRenderer>();
        lr.positionCount = ((xCells) * (yCells) * 5) + yCells;
        for(int i = 0; i < yCells; i++)
        {
            for(int j = 0; j < xCells; j++)
            {
                
                lr.SetPosition(j*5 + (i * xCells*5) + i, new Vector3(j, i, 0));
                lr.SetPosition(j*5 + (i * xCells*5) + 1 + i, new Vector3(j+1, i, 0));
                lr.SetPosition(j*5 + (i * xCells*5) + 2 + i, new Vector3(j+1, i+1, 0));
                lr.SetPosition(j*5 + (i * xCells*5) + 3 + i, new Vector3(j, i+1, 0));
                lr.SetPosition(j*5 + (i * xCells*5) + 4 + i, new Vector3(j, i, 0));
            }
            lr.SetPosition(xCells * 5 + (i * xCells * 5) + i, new Vector3(0, i, 0));
        }
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
