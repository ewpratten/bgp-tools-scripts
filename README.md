![Screenshot of the PeeringDB info script](https://i.imgur.com/E4z5J8L.png)

# Huh, what's this?
These are some public userscripts for the website www.bgp.tols written in JS for Tampermonkey. BGP.tools is used for exploring the internet ecosystem with support for querying for ASNs, IPs, IXPs, and even DNS with pages displaying network rankings & e.t.c. Our scripts extend the functionality of the site to display some useful information as well as to implement some custom functionality.

# Install
Install the Tampermonkey extension for your browser and create a new script. The copy paste the source of whichever script(s) you'd like to install into the code area and hit save. The script should automatically start working after saving.

# Overview of our scripts

## ixp-peering-capacity.js
This script shows the total IX peering capacity of any given network on the overview page under the website field.

* Author: **Kjartan Hrafnkelsson**
* Notes: **Not very well written, open to contributions**

## nlnog-ring-lg.js
This script adds an NLNOG RING query button to the prefix page. It allows you to easily open the NLNOG RING looking glass for any given prefix.

* Author: **Evan Pratten**
* Notes: **n/a**

## peering-db-data.js
This script displays various datapoints abouts any given network fetched from the PeeringDB website and displays them on the overview page. 

* Author: **Evan Pratten**
* Notes: **n/a**

# License
GPLv3
