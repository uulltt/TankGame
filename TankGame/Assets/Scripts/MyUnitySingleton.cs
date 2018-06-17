using UnityEngine;
using System.Collections;

public class MyUnitySingleton : MonoBehaviour
{
 //this is to make sure that only one instance of an object exists and it exists all the time. if you want multiple of these objects you need to make a copy of this script
	private static MyUnitySingleton instance = null;

	public static MyUnitySingleton Instance {
		get { return instance; }
	}

	void Awake ()
	{
		if (instance != null && instance != this) {
			Destroy (this.gameObject);
			return;
		} else {
			instance = this;
		}
		DontDestroyOnLoad (this.gameObject);
	}
}